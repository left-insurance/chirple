document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let product = document.getElementById("product").value;
    let description = document.getElementById("description").value;
    let audience = document.getElementById("audience").value;

    if (product === "" || description === "" || audience === "") {
        alert("Please fill in all fields.");
        return;
    }

    
    let adText = `"${product}" - ${description}. Perfect for ${audience}! Get yours today!`;

   
    let adDisplay = document.createElement("p");
    adDisplay.innerText = adText;
    document.body.appendChild(adDisplay);
});
