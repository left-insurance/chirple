import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { product, description, audience } = req.body;
    if (!product || !description || !audience) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = `Write an ad for ${product}. Description: ${description}. Target audience: ${audience}.`;

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContentStream({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    // Capture streamed content
    let fullText = "";
    for await (const chunk of result.stream) {
      fullText += chunk.text || "";
    }

    res.status(200).json({ ad: fullText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
}
