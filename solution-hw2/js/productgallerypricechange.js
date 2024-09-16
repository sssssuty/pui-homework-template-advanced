function myFunction() {
	alert("update was clicked!");
}
// document.querySelector("#pricetesting").addEventListener('click', myFunction);


// Roll class to store its type, base price, glazing, and packSize
class Roll {
    constructor(type, basePrice, priceElementId) {
        this.type = type;
        this.basePrice = basePrice;
        this.glazing = "Keep Original";
        this.packSize = 1;
        this.priceElementId = priceElementId;  // DOM element ID to update the price
    }

    // Method to compute the total price
    calculatePrice(glazingPrice, packMultiplier) {
        return (this.basePrice + glazingPrice) * packMultiplier;
    }
}

// Glazing and pack size options with price adaptations
const glazingOptions = {
    "Keep Original": 0.00,
    "Sugar Milk": 0.00,
    "Vanilla Milk": 0.50,
    "Double Chocolate": 1.50
};

const packSizeOptions = {
    1: 1,
    3: 3,
    6: 6,
    12: 12
};

// Array to hold the products in the cart
let cart = [];

// Array to store all Roll objects
const rolls = [
    new Roll("Original Cinnamon Roll", 2.49, "originalrollprice"),
    new Roll("Apple Cinnamon Roll", 3.49, "applerollprice"),
    new Roll("Raisin Cinnamon Roll", 2.99, "raisinrollprice"),
    new Roll("Walnut Cinnamon Roll", 3.49, "walnutrollprice"),
    new Roll("Double Chocolate Cinnamon Roll", 3.99, "chocolaterollprice"),
    new Roll("Strawberry Cinnamon Roll", 3.99, "strawberryrollprice")
];

// Populate the glazing dropdowns
function populateGlazingOptions() {
    for (let i = 0; i < rolls.length; i++) {
        let glazingSelect = document.getElementById(`product${i}glazing`);
        for (let [glazing, price] of Object.entries(glazingOptions)) {
            let option = document.createElement("option");
            option.value = price;
            option.text = glazing;
            glazingSelect.add(option);
        }
    }
}

// Update price based on glazing and pack size selections
function updatePrice(productId) {
    let glazingSelect = document.getElementById(`product${productId}glazing`);
    let glazingPrice = parseFloat(glazingSelect.value);

    let packSizeRadios = document.getElementsByName(`packsize${productId}`);
    let selectedPackSize = Array.from(packSizeRadios).find(radio => radio.checked).value;
    let packMultiplier = packSizeOptions[selectedPackSize];

    let newPrice = rolls[productId].calculatePrice(glazingPrice, packMultiplier);
    document.getElementById(rolls[productId].priceElementId).innerText = `$${newPrice.toFixed(2)}`;
}

// Add the selected roll to the cart
function addToCart(productId) {
    let glazingSelect = document.getElementById(`product${productId}glazing`);
    let selectedGlazing = glazingSelect.options[glazingSelect.selectedIndex].text;

    let packSizeRadios = document.getElementsByName(`packsize${productId}`);
    let selectedPackSize = Array.from(packSizeRadios).find(radio => radio.checked).value;

    let priceText = document.getElementById(rolls[productId].priceElementId).innerText;
    let totalPrice = parseFloat(priceText.substring(1));

    // Add roll to the cart
    cart.push({
        product: rolls[productId].type,
        glazing: selectedGlazing,
        packSize: selectedPackSize,
        totalPrice: totalPrice
    });

    // Update cart count and show popup
    document.getElementById("cart-count").innerText = cart.length;
    showCartPopup(rolls[productId].type, selectedGlazing, selectedPackSize, totalPrice);
}

// Show the cart popup for 3 seconds
function showCartPopup(productName, glazing, packSize, totalPrice) {
    document.getElementById("navpopupproductname").innerText = productName;
    document.getElementById("navpopupglazing").innerText = glazing;
    document.getElementById("navpopuppacknum").innerText = `Pack of ${packSize}`;
    document.getElementById("navpopuptotalprice").innerText = `$${totalPrice.toFixed(2)}`;

    let popup = document.getElementById("navpopup");
    popup.style.display = "block";
    
    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

// Initialize the page by populating glazing options
populateGlazingOptions();
