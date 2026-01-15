import type { Product } from "../../../models/product";

// The base (section + h1)
function createCartSection(): HTMLElement {
    const section = document.createElement("section");
    section.className = "cart";

    const h1 = document.createElement("h1");
    h1.className = "cart__title";
    h1.textContent = "YOUR CART";

    section.appendChild(h1);
    return section;
}

// Empty cart view 
function createEmptyCartView(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "cart-empty";

    const box = document.createElement("div");
    box.className = "cart-empty__box";

    const text = document.createElement("p");
    text.className = "cart-empty__text";
    text.textContent = "YOUR CART IS EMPTY";

    const btn = document.createElement("button");
    btn.className = "btn"; 
    btn.textContent = "GO BACK";
    btn.addEventListener("click", () => history.back());

    box.appendChild(text);
    box.appendChild(btn);
    wrapper.appendChild(box);

    return wrapper;
}

// Filled cart view
function createFilledCartView(product: Product): HTMLElement {
    const cartContainer = document.createElement("div");
    cartContainer.className = "cart-container";

    const img = document.createElement("img");
    img.className = "cart-container__img";
    img.src = product.image;
    img.alt = product.name;

    const productName = document.createElement("p");
    productName.className = "cart-container__p";
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.className = "cart-container__price";
    productPrice.textContent = `${product.price}SEK`; 

    const buttonMinus = document.createElement("button");
    buttonMinus.className = "qty-minus";
    buttonMinus.addEventListener = 

    const buttonPlus = document.createElement("button");
    buttonPlus.className = "qty-plus";
    buttonPlus.addEventListener = 

    const buttonRemove = document.createElement("button");
    buttonRemove.className = "removeItems";

    // Order summery section
    const wrapperSummery = document.createElement("div");
    wrapperSummery.className = "div-summery";

    const headingSummery = document.createElement("p");
    headingSummery.className = "div-summery__heading"
    headingSummery.textContent = "ORDER SUMMARY"

    const promoText = document.createElement("p");
    promoText.className = "promoText";
    promoText.textContent = "PROMO CODE";

    const form = document.createElement("form");
    form.className = "promoForm";

    const input = document.createElement("input");
    input.className = "promoInput";
    input.textContent = "ENTER CODE";

    const submitButton = document.createElement("button");
    submitButton.className = "btn-submit";
    submitButton.textContent = "SUBMIT";

    const subTotal = document.createElement("p");
    subTotal.className = "subTotal-text";
    subTotal.textContent = "SUBTOTAL";

    const shipping = document.createElement("p");
    shipping.className = "shipping-text";
    shipping.textContent = "SHIPPING";

    const total = document.createElement("p");
    total.className = "total-text";
    total.textContent = "TOTAL";

    const continueBtn = document.createElement("button");
    continueBtn.className = "btn-continue";
    continueBtn.textContent = "CONTINUE SHOPPING";

    const checkoutBtn = document.createElement("button");
    checkoutBtn.className = "btn-checkout";
    checkoutBtn.textContent = "CHECKOUT";  
}
