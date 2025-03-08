document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();

    let product = document.getElementById("product").value;
    let description = document.getElementById("description").value;
    let audience = document.getElementById("audience").value;

    if (product === "" || description === "" || audience === "") {
        alert("Please fill in all fields.");
        return;
    }

    let adOutput = document.getElementById("ad-output");
    adOutput.innerHTML = "<p>Generating AI ad... Please wait.</p>";

    try {
        let response = await fetch("/api/generate-ad", { // Secure API route
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product, description, audience })
        });

        let data = await response.json();
        adOutput.innerHTML = `<p><strong>Generated Ad:</strong> ${data.ad}</p>`;
    } catch (error) {
        adOutput.innerHTML = "<p>Error generating ad. Please try again.</p>";
    }
});

 
        
  
