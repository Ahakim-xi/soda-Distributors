document.addEventListener("DOMContentLoaded", () => {
  const sodaSelect = document.getElementById("soda-select");
  const sodaDetails = document.getElementById("soda-details");
  const sodaImage = document.getElementById("soda-image");
  const sodaName = document.getElementById("soda-name");
  const sodaFlavor = document.getElementById("soda-flavor");
  const sodaPrice = document.getElementById("soda-price");

  let sodas = [];

  // Fetch sodas from JSON server
  fetch("http://localhost:3000/sodas")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      sodas = data;

      // Populate dropdown
      sodas.forEach(soda => {
        const option = document.createElement("option");
        option.value = soda.name;
        option.textContent = soda.name;
        sodaSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error fetching sodas:", error);
    });

  // Show soda details when one is selected
  sodaSelect.addEventListener("change", () => {
    const selectedName = sodaSelect.value;

    // If no soda is selected, hide details and return
    if (!selectedName) {
      sodaDetails.style.display = "none";
      return;
    }

    const selectedSoda = sodas.find(soda => soda.name === selectedName);

    if (selectedSoda) {
      sodaDetails.style.display = "flex";  // or 'block' depending on your CSS layout
      sodaImage.src = selectedSoda.image || "";
      sodaImage.alt = selectedSoda.name || "Soda Image";
      sodaName.textContent = selectedSoda.name || "";
      sodaFlavor.textContent = `Flavor: ${selectedSoda.flavor || "N/A"}`;
      sodaPrice.textContent = `Price: ${selectedSoda.price || "N/A"} KES`;
    } else {
      sodaDetails.style.display = "none";
    }
  });
});
