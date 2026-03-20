export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {

const { product, description, audience } = req.body;

const prompt = `Write a high converting ad.

Product: ${product}
Description: ${description}
Audience: ${audience}

Make it catchy and engaging.`;

const response = await fetch("https://YOUR-RAPIDAPI-ENDPOINT", {
console.log(await response.text());
method: "POST",
headers: {
"Content-Type": "application/json",
"X-RapidAPI-Key": process.env.RAPID_API_KEY,
"X-RapidAPI-Host": "YOUR-RAPIDAPI-HOST"
},
body: JSON.stringify({
prompt
})
});

const data = await response.json();

res.status(200).json({
text: data.result || "No response"
});

} catch (error) {

res.status(500).json({
text: "Error generating ad"
});

}

}
