import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  try {
    // Allow only POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Get data from frontend
    const { product, description, audience } = req.body;

    // Validate input
    if (!product || !description || !audience) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prompt for AI
    const prompt = `
Write a short, catchy advertisement.

Product: ${product}
Description: ${description}
Target Audience: ${audience}

Make it engaging and suitable for social media.
`;

    // Gemini model
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate response (NON-stream for stability)
    const result = await model.generateContent(prompt);

    const text = result.response.text();

    // Always return JSON
    return res.status(200).json({ ad: text });

  } catch (error) {
    console.error("Gemini API Error:", error);

    return res.status(500).json({
      error: error.message || "Server error"
    });
  }
}
