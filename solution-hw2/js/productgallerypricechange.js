class Roll {
    constructor(type, basePrice, priceElementId) {
        this.type = type;
        this.basePrice = basePrice;
        this.glazing = "Keep Original";
        this.packSize = 1;
        this.priceElementId = priceElementId;
    }

    calculatePrice(glazingPrice, packMultiplier) {
        return (this.basePrice + glazingPrice) * packMultiplier;
    }
}

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

let cart = [];

const rolls = [
    new Roll("Original Cinnamon Roll", 2.49, "originalrollprice"),
    new Roll("Apple Cinnamon Roll", 3.49, "applerollprice"),
    new Roll("Raisin Cinnamon Roll", 2.99, "raisinrollprice"),
    new Roll("Walnut Cinnamon Roll", 3.49, "walnutrollprice"),
    new Roll("Double Chocolate Cinnamon Roll", 3.99, "chocolaterollprice"),
    new Roll("Strawberry Cinnamon Roll", 3.99, "strawberryrollprice")
];

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

function updatePrice(productId) {
    let glazingSelect = document.getElementById(`product${productId}glazing`);
    let glazingPrice = parseFloat(glazingSelect.value);

    let packSizeRadios = document.getElementsByName(`packsize${productId}`);
    let selectedPackSize = Array.from(packSizeRadios).find(radio => radio.checked).value;
    let packMultiplier = packSizeOptions[selectedPackSize];

    let newPrice = rolls[productId].calculatePrice(glazingPrice, packMultiplier);
    document.getElementById(rolls[productId].priceElementId).innerText = `$${newPrice.toFixed(2)}`;
}

let cartcountnum;
let num;
function addToCart(productId) {
    let glazingSelect = document.getElementById(`product${productId}glazing`);
    let selectedGlazing = glazingSelect.options[glazingSelect.selectedIndex].text;

    let packSizeRadios = document.getElementsByName(`packsize${productId}`);
    let selectedPackSize = Array.from(packSizeRadios).find(radio => radio.checked).value;

    let priceText = document.getElementById(rolls[productId].priceElementId).innerText;

    let totalPrice = parseFloat(priceText.substring(1));
    cart.push({
        product: rolls[productId].type,
        glazing: selectedGlazing,
        packSize: selectedPackSize,
        totalPrice: totalPrice
    });

    if (cartcountnum == undefined) {
        num = 0;
        cartcountnum = parseFloat(cart[num].packSize); 
    } else {
        cartcountnum = cartcountnum + parseFloat(cart[num].packSize);
    }
    document.getElementById("cart-count").innerText = cartcountnum;
    num ++ ;
    showCartPopup(rolls[productId].type, selectedGlazing, selectedPackSize, totalPrice);
}

let navtotalpricenum;
function showCartPopup(productName, glazing, packSize, totalPrice) {
    document.getElementById("navpopupproductname").innerText = productName;
    document.getElementById("navpopupglazing").innerText = glazing;
    document.getElementById("navpopuppacknum").innerText = `Pack of ${packSize}`;
    document.getElementById("navpopuptotalprice").innerText = `$${totalPrice.toFixed(2)}`;

    if (navtotalpricenum == undefined) {
        navtotalpricenum = 0;
        document.getElementById("navtotalprice").innerText = `$${totalPrice.toFixed(2)}`;
        navtotalpricenum = parseFloat(totalPrice.toFixed(2));
    } else {
        navtotalpricenum = parseFloat(navtotalpricenum) + parseFloat(totalPrice.toFixed(2));
        document.getElementById("navtotalprice").innerText = '$'+ navtotalpricenum.toFixed(2);
    }
    document.getElementById("navtotalprice").style.display = "default";

    let popup = document.getElementById("navpopup");
    popup.style.display = "block";
    
    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

populateGlazingOptions();
