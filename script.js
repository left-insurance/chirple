const toggle = document.getElementById("toggle");
const output = document.getElementById("output");
const posterBtn = document.getElementById("posterBtn");
const posterImage = document.getElementById("posterImage");


toggle.addEventListener("change", () => {
document.body.classList.toggle("light");
});


document.getElementById("generate").addEventListener("click", () => {

const product = document.getElementById("product").value;

output.innerText = "Ad for " + product + " coming soon...";

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
