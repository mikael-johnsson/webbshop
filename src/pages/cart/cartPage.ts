import type { Cart } from "../../models/Cart";
import type { CartItem } from "../../models/CartItem";
import { addItemToCart, findCart, removeOneItemFromCart } from "../../utils/cartUtils";
import "..//../scss/cart.scss";

const getCartFromLS = (): Cart | null => {
  const cartString = localStorage.getItem("cart");
  if (!cartString) return null;
  return JSON.parse(cartString);
};

function createCartSection(): HTMLElement {
  const section = document.createElement("section");
  section.className = "cart";

  const h1 = document.createElement("h1");
  h1.className = "cart__title";
  h1.textContent = "YOUR CART";

  section.appendChild(h1);
  return section;
}

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
  qtyWrap.className = "cart-qty";

  const qtyText = document.createElement("span");
  qtyText.className = "qty";
  qtyText.textContent = String(item.amount);

  const buttonMinus = document.createElement("button");
  buttonMinus.className = "qty-minus";
  buttonMinus.textContent = "-";

  const buttonPlus = document.createElement("button");
  buttonPlus.className = "qty-plus";
  buttonPlus.textContent = "+";

  const buttonRemove = document.createElement("button");
  buttonRemove.className = "removeItems";
  buttonRemove.textContent = "REMOVE";

  buttonPlus.addEventListener("click", async () => {
    await addItemToCart(String(item.product.id));
    onChange();
  });

  buttonMinus.addEventListener("click", () => {
    removeOneItemFromCart(String(item.product.id));
    onChange();
  });


  qtyWrap.append(buttonMinus, qtyText, buttonPlus);
  cartContainer.append(img, productName, qtyWrap, productPrice, buttonRemove);

  return cartContainer;
}

function createOrderSummery(cart: Cart): HTMLElement {
  const wrapperSummery = document.createElement("div");
  wrapperSummery.className = "div-summery";

  const headingSummery = document.createElement("p");
  headingSummery.className = "div-summery__heading";
  headingSummery.textContent = "ORDER SUMMARY";

  let subtotalSum = 0;
  cart.items.forEach((item) => {
  subtotalSum += item.product.price * item.amount;
  });

  const shippingCost = cart.shippingPrice || 0;
  const totalSum = subtotalSum + shippingCost;

  const subTotalText = document.createElement("p");
  subTotalText.textContent = `SUBTOTAL: ${subtotalSum} SEK`;

  const shippingText = document.createElement("p");
  shippingText.textContent = `SHIPPING: ${shippingCost} SEK`;

  const totalText = document.createElement("p");
  totalText.textContent = `TOTAL: ${totalSum} SEK`;

  wrapperSummery.append(headingSummery, subTotalText, shippingText, totalText);
  return wrapperSummery;
}

// Init
export const initCartPage = async () => {
  
 findCart();

  const main = document.getElementById("main");
  if (!main) {
    console.error('Hittar inte elementet med id="main" i HTML.');
    return;
  }

  const render = () => {
    console.log("LS cart just nu:", localStorage.getItem("cart"));

    const cart = getCartFromLS();

    main.innerHTML = "";
    const section = createCartSection();
    main.appendChild(section);

    if (!cart || cart.items.length === 0) {
      section.appendChild(createEmptyCartView());
      return;
    }

    cart.items.forEach((item) => {
      section.appendChild(createCartItem(item, render));
    });

    section.appendChild(createOrderSummery(cart));
  };

  render();
};


initCartPage();

