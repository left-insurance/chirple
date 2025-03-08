export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { product, description, audience } = req.body;
    const apiKey = process.env.OPENAI_API_KEY; // Secure key from Vercel

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Create an engaging ad for ${product}. Description: ${description}. Target Audience: ${audience}.`,
                max_tokens: 50
            })
        });

        const data = await response.json();
        res.status(200).json({ ad: data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: "Error generating ad" });
    }
}
