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

  // Fetch sodas from your local JSON server
  fetch("http://localhost:3000/sodas")
    .then(res => res.json())
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
    .catch(err => {
      console.error("Failed to fetch sodas:", err);
      sodaDetails.style.display = "none";
      totalDisplay.textContent = "Error loading sodas.";
    });

  // When user selects a soda, show details
  sodaSelect.addEventListener("change", () => {
    const selectedName = sodaSelect.value;
    const selectedSoda = sodas.find(s => s.name === selectedName);

    if (selectedSoda) {
      sodaDetails.style.display = "flex";
      sodaImage.src = selectedSoda.image;
      sodaImage.alt = selectedSoda.name;
      sodaName.textContent = selectedSoda.name;
      sodaFlavor.textContent = `Flavor: ${selectedSoda.flavor}`;
      sodaPrice.textContent = `Price: ${selectedSoda.price} KES`;
    } else {
      sodaDetails.style.display = "none";
      sodaImage.src = "";
      sodaName.textContent = "";
      sodaFlavor.textContent = "";
      sodaPrice.textContent = "";
    }

    totalDisplay.textContent = ""; // clear previous total
  });

  // Calculate total on button click
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

    // Base price from soda (your db.json shows price 50 KES for all, but you can customize)
    const basePrice = selectedSoda.price;

    // Size price additions (based on your HTML options)
    let sizePrice = 0;
    switch (sizeValue) {
      case "300ml":
        sizePrice = 50;
        break;
      case "500ml":
        sizePrice = 80;
        break;
      case "1L":
        sizePrice = 120;
        break;
      case "2L":
        sizePrice = 180;
        break;
      default:
        sizePrice = 0;
    }

    // Delivery fee
    const deliveryFee = deliveryValue === "yes" ? 250 : 0;

    // Calculate total price
    const total = quantity * sizePrice + deliveryFee;

    totalDisplay.textContent = `Total Price: ${total} KES`;
  });
});
