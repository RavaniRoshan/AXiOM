
import { GoogleGenAI } from "@google/genai";

export const runResearchAxiom = async (query: string, onUpdate: (chunk: string) => void) => {
  // Initialize AI client inside the function to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-pro-preview";
  
  const systemInstruction = `
    You are AXIOM, an evidence-first research agent.
    Your purpose is to produce accurate, grounded, and auditable research outputs.
    Follow the 6-step Research Pipeline:
    1. Query Decomposition
    2. Evidence Gathering (Simulated)
    3. Parallel Analysis (Analyst, Skeptic, Historian, Quant)
    4. Claim Grounding (Fact/Inference/Hypothesis)
    5. Verification Check
    6. Final Output (Summary, Detailed, Counterpoints, Unknowns, Next Steps)
    
    Style: Sober, structured, technical. No marketing fluff. Use Markdown.
  `;

  try {
    // Simplified contents to a string for text-only prompts as per SDK guidelines
    const responseStream = await ai.models.generateContentStream({
      model,
      contents: `Analyze the following query using the AXIOM pipeline: ${query}`,
      config: {
        systemInstruction,
        temperature: 0.2,
      }
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        onUpdate(chunk.text);
      }
    }
  } catch (error) {
    console.error("AXIOM Engine Failure:", error);
    onUpdate("ERROR: Fatal engine state. Verification loop failed.");
  }
};
