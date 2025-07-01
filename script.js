document.addEventListener("DOMContentLoaded", () => {
  const sodaSelect = document.getElementById("soda-select");
  const sodaDetails = document.getElementById("soda-details");
  const sodaImage = document.getElementById("soda-image");
  const sodaName = document.getElementById("soda-name");
  const sodaFlavor = document.getElementById("soda-flavor");
  const sodaPrice = document.getElementById("soda-price");

  const quantityInput = document.getElementById("quantity");
  const sizeSelect = document.getElementById("size");
  const deliverySelect = document.getElementById("delivery");
  const calculateBtn = document.getElementById("calculate-btn");
  const totalDisplay = document.getElementById("total-display");

  let sodas = [];

  function fetchSodas() {
    const url = "https://raw.githubusercontent.com/Ahakim-xi/soda-Distributors/refs/heads/main/sodas.json"; 

    fetch(url)
      .then(res => res.json())
      .then(data => {
        sodas = data;
        displaySodaOptions(sodas);
      })
      .catch(() => {
        displayError("Failed to load sodas. Please try again.");
      });
  }

  function displaySodaOptions(sodaList) {
    sodaSelect.innerHTML = `<option value="">-- Choose a soda --</option>`;
    sodaList.forEach(soda => {
      const option = document.createElement("option");
      option.value = soda.name;
      option.textContent = soda.name;
      sodaSelect.appendChild(option);
    });
  }

  function displayError(message) {
    sodaDetails.style.display = "none";
    totalDisplay.textContent = message;
  }

  function showSodaDetails(soda) {
    sodaDetails.style.display = "flex";
    sodaImage.src = soda.image;
    sodaImage.alt = soda.name;
    sodaName.textContent = soda.name;
    sodaFlavor.textContent = `Flavor: ${soda.flavor}`;
    sodaPrice.textContent = `Price: ${soda.price} KES`;
  }

  sodaSelect.addEventListener("change", () => {
    const selectedName = sodaSelect.value;
    const selectedSoda = sodas.find(s => s.name === selectedName);

    if (selectedSoda) {
      showSodaDetails(selectedSoda);
    } else {
      sodaDetails.style.display = "none";

    }


    totalDisplay.textContent = "";
  });


  calculateBtn.addEventListener("click", () => {
    const selectedName = sodaSelect.value;
    const quantity = parseInt(quantityInput.value);
    const sizeValue = sizeSelect.value;
    const deliveryValue = deliverySelect.value;

    if (!selectedName) {
      alert("Please select a soda.");
      return;
    }

    if (!quantity || quantity <= 0 || isNaN(quantity)) {
      alert("Please enter a valid quantity.");
      return;
    }

    const selectedSoda = sodas.find(s => s.name === selectedName);
    if (!selectedSoda) {
      alert("Selected soda not found.");
      return;
    }

    let sizePrice = 0;
    switch (sizeValue) {
      case "300ml": sizePrice = 50; break;
      case "500ml": sizePrice = 80; break;
      case "1L": sizePrice = 120; break;
      case "2L": sizePrice = 180; break;
      default: sizePrice = 0;
    }

    const deliveryFee = deliveryValue === "yes" ? 250 : 0;


    const total = quantity * sizePrice + deliveryFee;

    totalDisplay.textContent = `Total Price: ${total} KES`;
  });

  
  fetchSodas();
});
