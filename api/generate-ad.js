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
2️⃣ Store Your API Key Securely in Vercel
✅ Go to Vercel Dashboard
✅ Open Your Chirple Project
✅ Go to "Settings" → "Environment Variables"
✅ Add a new variable:

Key: OPENAI_API_KEY
Value: Paste your OpenAI API Key
✅ Click Save & Redeploy
3️⃣ Update script.js to Call the Secure API
✅ Go to GitHub → Open script.js → Edit
✅ Replace with this code:

js
Copy
Edit
document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    let product = document.getElementById("product").value;
    let description = document.getElementById("description").value;
    let audience = document.getElementById("audience").value;

    if (!product || !description || !audience) {
        alert("Please fill in all fields.");
        return;
    }

    let adOutput = document.getElementById("ad-output");
    adOutput.innerHTML = "<p>Generating AI ad... Please wait.</p>";

    try {
        let response = await fetch("/api/generate-ad", { // Secure API call
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product, description, audience })
        });

        let data = await response.json();
        adOutput.innerHTML = `<p><strong>Generated Ad:</strong> ${data.ad}</p>`;
    } catch (error) {
        adOutput.innerHTML = "<p>Error generating ad. Please try again.</p>";
    }
});
