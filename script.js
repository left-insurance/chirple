document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form refresh

    const product = document.getElementById("product").value;
    const description = document.getElementById("description").value;
    const audience = document.getElementById("audience").value;

    try {
        const response = await fetch("/api/generate-ad", {
            method: "POST", // ✅ Must be POST
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product, description, audience }),
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById("generated-ad").innerText = `Generated Ad: ${data.ad}`;
        } else {
            throw new Error(data.error || "Error generating ad.");
        }
    } catch (error) {
        document.getElementById("generated-ad").innerText = `Error: ${error.message}`;
    }
});
