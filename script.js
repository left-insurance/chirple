document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript is running!"); // Debugging log
    const form = document.getElementById("ad-form");
    
    if (!form) {
        console.error("Form not found!");
        return;
    }
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("Form submitted!");
        
        const product = document.getElementById("product").value.trim();
        const description = document.getElementById("description").value.trim();
        const audience = document.getElementById("audience").value.trim();
        
        if (!product || !description || !audience) {
            alert("Please fill in all fields.");
            return;
        }
        
        const adOutput = document.getElementById("ad-output");
        adOutput.innerHTML = "<p>Generating AI ad... Please wait.</p>";
        
        try {
            const response = await fetch("/api/generate-ad", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product, description, audience })
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            adOutput.innerHTML = `<p><strong>Generated Ad:</strong> ${data.ad || "Error generating ad."}</p>`;
        } catch (error) {
            console.error("Error:", error);
            adOutput.innerHTML = "<p>Error generating ad. Please try again.</p>";
        }
    });
});

       
          
