document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const product = document.getElementById("product").value;
  const description = document.getElementById("description").value;
  const audience = document.getElementById("audience").value;

  const output = document.getElementById("generated-ad");

  // Show loading
  output.innerText = "Generating ad... ⏳";

  try {
    const response = await fetch("/api/generate-ad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product, description, audience }),
    });

    // Read as text first (safe)
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Server returned invalid response");
    }

    if (response.ok) {
      output.innerText = `Generated Ad:\n\n${data.ad}`;
    } else {
      throw new Error(data.error || "Error generating ad");
    }

  } catch (error) {
    output.innerText = `Error: ${error.message}`;
  }
});
