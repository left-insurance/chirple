const toggle = document.getElementById("toggle");
const output = document.getElementById("output");
const posterBtn = document.getElementById("posterBtn");
const posterImage = document.getElementById("posterImage");


toggle.addEventListener("change", () => {
document.body.classList.toggle("light");
});


document.getElementById("generate").addEventListener("click", async () => {

const product = document.getElementById("product").value;
const description = document.getElementById("description").value;
const audience = document.getElementById("audience").value;

output.innerText = "Generating...";

const response = await fetch("/api/generate", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
product,
description,
audience
})
});

const data = await response.json();

output.innerText = data.text;

});

posterBtn.addEventListener("click", () => {

const product = document.getElementById("product").value;
const description = document.getElementById("description").value;

const prompt = product + " advertising poster " + description;

const imageUrl = "https://picsum.photos/512"; +
encodeURIComponent(prompt) +
"?width=512&height=512&nologo=true";

posterImage.src = imageUrl;

});
