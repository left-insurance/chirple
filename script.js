async function generateAd() {
  const product = document.getElementById("product").value;
  const description = document.getElementById("description").value;
  const audience = document.getElementById("audience").value;

  const res = await fetch("/api/generate-ad", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ product, description, audience })
  });

  const data = await res.json();

  document.getElementById("result").innerText = data.ad;
}
