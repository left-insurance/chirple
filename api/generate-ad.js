import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { product, description, audience } = req.body;

    if (!product || !description || !audience) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert ad copywriter." },
        { role: "user", content: `Write an ad for ${product}. Description: ${description}. Target audience: ${audience}.` },
      ],
      max_tokens: 100,
    });

    const adText = aiResponse.choices?.[0]?.message?.content || "No response from AI.";

    res.status(200).json({ ad: adText });
  } catch (error) {
    console.error("OpenAI API Error:", error);

    // Ensure error response is valid JSON
    res.status(500).json({ error: "Server error. Check logs for details." });
  }
}
