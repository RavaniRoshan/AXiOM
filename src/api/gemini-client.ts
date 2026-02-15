import { GoogleGenAI, type GenerateContentConfig } from "@google/genai";
import type { ReasoningTrace } from "./types";

// Gemini API configuration
const GEMINI_MODEL = "gemini-2.0-flash-thinking-exp-01-21";
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

// Get API key from environment
function getApiKey(): string {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key not found. Set VITE_GEMINI_API_KEY in your .env file.");
  }
  return apiKey;
}

// Interface for Gemini response with thinking
export interface GeminiResponse {
  text: string;
  thinking?: string;
}

// Interface for Gemini call options
export interface GeminiCallOptions {
  userPrompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  returnThinking?: boolean;
}

/**
 * Parse thinking process into structured reasoning traces
 */
export function parseThinkingProcess(thinking: string | undefined): ReasoningTrace[] {
  if (!thinking || thinking.trim().length === 0) {
    return [];
  }

  const lines = thinking.split('\n').filter(line => line.trim().length > 0);
  const now = new Date();
  
  return lines.map((line, index) => {
    const content = line.trim();
    let type: ReasoningTrace['type'] = "THOUGHT";
    
    // Detect type based on content patterns
    const lowerContent = content.toLowerCase();
    if (lowerContent.startsWith('action:') || lowerContent.startsWith('>') || lowerContent.includes('search_tool')) {
      type = "ACTION";
    } else if (lowerContent.startsWith('validate:') || lowerContent.includes('verify') || lowerContent.includes('confidence')) {
      type = "VALIDATE";
    } else if (lowerContent.startsWith('error:') || lowerContent.includes('fail') || lowerContent.includes('unable')) {
      type = "ERROR";
    }

    // Generate timestamp with slight offset for each entry
    const timestamp = new Date(now.getTime() + index * 100).toISOString();
    
    return {
      timestamp,
      type,
      content,
    };
  });
}

/**
 * Parse JSON with retry logic and cleanup
 */
export function parseJSON<T>(text: string, retries = 0): T {
  try {
    // Try direct parsing first
    return JSON.parse(text) as T;
  } catch {
    if (retries < MAX_RETRIES) {
      // Clean up common JSON issues
      let cleaned = text;
      
      // Remove markdown code blocks
      cleaned = cleaned.replace(/```json\s*/g, '');
      cleaned = cleaned.replace(/```\s*/g, '');
      
      // Remove leading/trailing whitespace
      cleaned = cleaned.trim();
      
      // Try to extract JSON from text
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/) || cleaned.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return parseJSON<T>(jsonMatch[0], retries + 1);
      }
      
      return parseJSON<T>(cleaned, retries + 1);
    }
    
    throw new Error(`Failed to parse response as JSON after ${MAX_RETRIES + 1} attempts`);
  }
}

/**
 * Main Gemini API call with retry logic
 */
export async function callGemini(options: GeminiCallOptions): Promise<GeminiResponse> {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });
  
  const config: GenerateContentConfig = {
    temperature: options.temperature ?? 0.3,
    maxOutputTokens: options.maxTokens ?? 4000,
    systemInstruction: options.systemPrompt,
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Add delay for retries
      if (attempt > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt));
      }

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: options.userPrompt,
        config,
      });

      const text = response.text;
      if (!text || text.trim().length === 0) {
        throw new Error("Empty response from Gemini API");
      }

      // For now, we can't easily extract thinking from the standard SDK
      // The thinking will be embedded in the response or we can use a different approach
      return {
        text,
        thinking: undefined, // Will be populated from response metadata if available
      };

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`Gemini API attempt ${attempt + 1} failed:`, lastError.message);
      
      // Don't retry on authentication errors
      if (lastError.message.includes("API key") || lastError.message.includes("authentication")) {
        throw lastError;
      }
    }
  }

  throw lastError || new Error("Gemini API call failed after all retries");
}

/**
 * Generate a unique run ID
 */
export function generateRunId(): string {
  return "0x" + Math.random().toString(16).slice(2, 6).toUpperCase();
}

/**
 * Check for circular dependencies in task graph
 */
export function detectCircularDependencies(tasks: Array<{ id: string; dependencies: string[] }>): boolean {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const taskMap = new Map(tasks.map(t => [t.id, t]));

  function hasCycle(taskId: string): boolean {
    if (recursionStack.has(taskId)) return true;
    if (visited.has(taskId)) return false;

    const task = taskMap.get(taskId);
    if (!task) return false;

    visited.add(taskId);
    recursionStack.add(taskId);

    for (const depId of task.dependencies) {
      if (hasCycle(depId)) return true;
    }

    recursionStack.delete(taskId);
    return false;
  }

  for (const task of tasks) {
    if (hasCycle(task.id)) return true;
  }

  return false;
}
