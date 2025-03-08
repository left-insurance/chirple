document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevents page refresh

    let product = document.getElementById("product").value;
    let description = document.getElementById("description").value;
    let audience = document.getElementById("audience").value;

    if (product === "" || description === "" || audience === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Show loading message
    let adOutput = document.getElementById("ad-output");
    adOutput.innerHTML = "<p>Generating AI ad... Please wait.</p>";

    try {
        let response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevents page refresh

    let product = document.getElementById("product").value;
    let description = document.getElementById("description").value;
    let audience = document.getElementById("audience").value;

    if (product === "" || description === "" || audience === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Show loading message
    let adOutput = document.getElementById("ad-output");
    adOutput.innerHTML = "<p>Generating AI ad... Please wait.</p>";

    try {
        let response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " // Replace with your API key
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Create an engaging ad for ${product}. Description: ${description}. Target Audience: ${audience}.`,
                max_tokens: 50
            })
        });

        let data = await response.json();
        adOutput.innerHTML = `<p><strong>Generated Ad:</strong> ${data.choices[0].text.trim()}</p>`;
    } catch (error) {
        adOutput.innerHTML = "<p>Error generating ad. Please try again.</p>";
    }
});" 
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Create an engaging ad for ${product}. Description: ${description}. Target Audience: ${audience}.`,
                max_tokens: 50
            })
        });

        let data = await response.json();
        adOutput.innerHTML = `<p><strong>Generated Ad:</strong> ${data.choices[0].text.trim()}</p>`;
    } catch (error) {
        adOutput.innerHTML = "<p>Error generating ad. Please try again.</p>";
    }
});
