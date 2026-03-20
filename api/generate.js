export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {

const { product, description, audience } = req.body;

const prompt = `Write a high converting advertisement.

Product: ${product}
Description: ${description}
Target audience: ${audience}

Make it catchy and engaging.`;

const response = await fetch("https://open-ai21.p.rapidapi.com/chatgpt", {
method: "POST",
headers: {
"Content-Type": "application/json",
"X-RapidAPI-Key": process.env.RAPID_API_KEY,
"X-RapidAPI-Host": "open-ai21.p.rapidapi.com"
},
body: JSON.stringify({
messages: [
{
role: "user",
content: prompt
}
],
web_access: false
})
});

const data = await response.json();

res.status(200).json({
text: data.result || "No response from AI"
});

} catch (error) {

console.error(error);

res.status(500).json({
text: "Error generating ad"
});

}

}
