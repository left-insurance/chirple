export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { product, description, audience } = req.body;

    if (!product || !description || !audience) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: { text: `Write an ad for ${product}. Description: ${description}. Target audience: ${audience}.` },
      }),
    });

    const data = await response.json();
    
    // Debugging: Log response
    console.log("API Response:", data);
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("Invalid response from AI API");
    }

    res.status(200).json({ ad: data.candidates[0].output });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
}
 
