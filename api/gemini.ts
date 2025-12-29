import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body || {};
  if (!query) return res.status(400).json({ error: 'Missing query' });

  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server missing API key' });

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-3-pro-preview';
    const systemInstruction = `You are AXIOM, an evidence-first research agent. Produce structured, auditable research output.`;

    const stream = await ai.models.generateContentStream({
      model,
      contents: `Analyze the following query using the AXIOM pipeline: ${query}`,
      config: { systemInstruction, temperature: 0.2 }
    });

    let full = '';
    for await (const chunk of stream) {
      if (chunk.text) full += chunk.text;
    }

    return res.status(200).json({ text: full });
  } catch (err: any) {
    console.error('gemini api error', err);
    return res.status(500).json({ error: 'AI request failed', details: String(err?.message || err) });
  }
}
