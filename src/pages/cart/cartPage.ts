import type { Cart } from "../../models/Cart";
import type { CartItem } from "../../models/CartItem";
import { addItemToCart, findCart, removeOneItemFromCart } from "../../utils/cartUtils";
import "..//../scss/cart.scss"

const getCartFromLS = (): Cart | null => {
    const cartString = localStorage.getItem("cart");
    if (!cartString) return null;
    return JSON.parse(cartString);
  };

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
function createCartItem(item: CartItem, onChange: () => void): HTMLElement {
    const cartContainer = document.createElement("div");
    cartContainer.className = "cart-container";
 
    const img = document.createElement("img");
    img.className = "cart-container__img";
    img.src = item.product.image;
    img.alt = item.product.name;
 
    const productName = document.createElement("p");
    productName.className = "cart-container__p";
    productName.textContent = item.product.name;
 
    const productPrice = document.createElement("p");
    productPrice.className = "cart-container__price";
    productPrice.textContent = `${item.product.price} SEK`;
 
    const qtyWrap = document.createElement("div");
    qtyWrap.className = "cart-qty"
 
    const qtyText = document.createElement("span");
    qtyText.className = "qty";
    qtyText.textContent = String(item.amount);
 
    const buttonMinus = document.createElement("button");
    buttonMinus.className = "qty-minus";
 
    const buttonPlus = document.createElement("button");
    buttonPlus.className = "qty-plus";
 
    const buttonRemove = document.createElement("button");
    buttonRemove.className = "removeItems";
 
    
 
    // Connect to cartUtils
    buttonPlus.addEventListener("click", async () => {
    await addItemToCart(String(item.product.id));
    console.log("Item added");
    onChange();
    });
 
    buttonMinus.addEventListener("click", () => {
    removeOneItemFromCart(String(item.product.id));
    console.log("Item removed");
    onChange();
    });
 
    return cartContainer
}

// initCartPage function - render function + item forEach loop
export const initCartPage = () => {
    console.log("initCartPage körs");
 
    findCart();
 
    const main = document.getElementById("main");
    if(!main) return;
 
    const render = () => {
        console.log("render() körs");
        const cart = getCartFromLS();
        console.log("Cart now:", cart)
        if(!cart) return;
 
        main.innerHTML = "";
 
        const section = createCartSection();
        main.appendChild(section)
 
        if(cart.items.length === 0) {
            section.appendChild(createEmptyCartView());
            return;
        }
 
        cart.items.forEach((item) => {
        section.appendChild(createCartItem(item, render))
    });
 
    function createOrderSummery(cart: Cart): HTMLElement {
        const wrapperSummery = document.createElement("div");
        wrapperSummery.className = "div-summery";
 
        const headingSummery = document.createElement("p");
        headingSummery.className = "div-summery__heading"
        headingSummery.textContent = "ORDER SUMMARY"

        let subtotal = 0;
        cart.items.forEach((item) => {
        subtotal += item.product.price * item.amount;
        });
 
 
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

        const subTotalWrapper = document.createElement("div");
        subTotalWrapper.className = "subTotalWrapper";
 
        const subTotal = document.createElement("p");
        subTotal.className = "subTotal-text";
        subTotal.textContent = "SUBTOTAL";

        const subTotalPrice = document.createElement("p");
        subTotalPrice.className = "subTotalPrice";
        subTotalPrice.textContent = `${subTotal}SEK`;

        const shippingWrapper = document.createElement("div");
        shippingWrapper.className = "shippingWrapper";
 
        const shipping = document.createElement("p");
        shipping.className = "shipping-text";
        shipping.textContent = "SHIPPING";

        const shippingPrice = document.createElement("p");
        shippingPrice.className = "shippingPrice";
        shippingPrice.textContent = `${cart.shippingPrice}SEK`;

        const totalWrapper = document.createElement("div");
        totalWrapper.className = "totalWrapper";
 
        const total = document.createElement("p");
        total.className = "total-text";
        total.textContent = "TOTAL";

        const totalPrice = document.createElement("p");
        totalPrice.className = "totalPrice";
        totalPrice.textContent = `${cart.shippingPrice}+${subTotal}SEK`;
 
        const continueBtn = document.createElement("button");
        continueBtn.className = "btn-continue";
        continueBtn.textContent = "CONTINUE SHOPPING";
 
        const checkoutBtn = document.createElement("button");
        checkoutBtn.className = "btn-checkout";
        checkoutBtn.textContent = "CHECKOUT";  
 
    return wrapperSummery
     }
       
    }
    render();
  
};
 
initCartPage();