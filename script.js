document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    
    if (!form) {
        console.error("Form not found!");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Stops the page from refreshing

        let product = document.getElementById("product").value.trim();
        let description = document.getElementById("description").value.trim();
        let audience = document.getElementById("audience").value.trim();

        if (!product || !description || !audience) {
            alert("Please fill in all fields.");
            return;
        }

        let adOutput = document.getElementById("ad-output");
        adOutput.innerHTML = "<p>Generating AI ad... Please wait.</p>";

        try {
            let response = await fetch("/api/generate-ad", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product, description, audience })
            });

            let data = await response.json();
            adOutput.innerHTML = `<p><strong>Generated Ad:</strong> ${data.ad || "Error generating ad."}</p>`;
        } catch (error) {
            console.error("Error:", error);
            adOutput.innerHTML = "<p>Error generating ad. Please try again.</p>";
        }
    });
});
   
