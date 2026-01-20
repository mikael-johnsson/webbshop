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
  const cartContainer = document.createElement("section");
  cartContainer.className = "cart-container";

  const imgWrapper = document.createElement("div");
  imgWrapper.className = "imgWrapper";

  const img = document.createElement("img");
  img.className = "cart-container__img";
  img.src = item.product.image;
  img.alt = item.product.name;

  const priceWrapper = document.createElement("div");
  priceWrapper.className = "priceWrapper";

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

  const btnRemoveWrapper = document.createElement("div");
  btnRemoveWrapper.className = "btnRemoveWrapper";

  const buttonRemove = document.createElement("button");
  buttonRemove.className = "removeItems";
  buttonRemove.textContent = "REMOVE";

  const actionsRow = document.createElement("div");
  actionsRow.className = "cart-actions";

  buttonPlus.addEventListener("click", async () => {
    await addItemToCart(String(item.product.id));
    onChange();
  });

  buttonMinus.addEventListener("click", () => {
    removeOneItemFromCart(String(item.product.id));
    onChange();
  });

  imgWrapper.appendChild(img);
  qtyWrap.append(buttonMinus, qtyText, buttonPlus);
  priceWrapper.append(productName, productPrice);
  btnRemoveWrapper.append(buttonRemove);
  actionsRow.append(qtyWrap, btnRemoveWrapper);
  cartContainer.append(imgWrapper, priceWrapper, actionsRow);

  return cartContainer;
}

function createOrderSummery(cart: Cart): HTMLElement {
  const wrapperSummery = document.createElement("aside");
  wrapperSummery.className = "wrapperSummery";

  const summery = document.createElement("div");
  summery.className = "summery";

  const headingSummery = document.createElement("p");
  headingSummery.className = "wrapperSummery__heading";
  headingSummery.textContent = "ORDER SUMMARY";

  const promoSection = document.createElement("div");
  promoSection.className = "wrapperSummery__promo";

  const promoLable = document.createElement("p");
  promoLable.className = "wrapperSummery__lable";
  promoLable.textContent = "PROMO CODE";

  const promoRow = document.createElement("div");
  promoRow.className = "wrapperSummery__promoRow";

  const promoInput = document.createElement("input");
  promoInput.className = "wrapperSummery__promoInput";
  promoInput.type = "text";
  promoInput.placeholder = "ENTER CODE";

  const promoBtn = document.createElement("button");
  promoBtn.className = "wrapperSummery__promoBtn";
  promoBtn.textContent = "SUBMIT";

  // BEHÖVS HANTERAS !!
  promoBtn.addEventListener("click", () => {
    console.log("Promo code:",);
  });

  let subtotalSum = 0;
  cart.items.forEach((item) => {
  subtotalSum += item.product.price * item.amount;
  });

  const shippingCost = cart.shippingPrice || 0;
  const totalSum = subtotalSum + shippingCost;

  const lines = document.createElement("div");
  lines.className = "wrapperSummery__lines";

  const subTotalText = document.createElement("p");
  subTotalText.textContent = `SUBTOTAL: ${subtotalSum} SEK`;

  const shippingText = document.createElement("p");
  shippingText.textContent = `SHIPPING: ${shippingCost} SEK`;

  const totalRowWrap = document.createElement("div");
  totalRowWrap.className = "wrapperSummery__total";

  const totalText = document.createElement("p");
  totalText.textContent = `TOTAL: ${totalSum} SEK`;

  const actions = document.createElement("div");
  actions.className = "wrapperSummery__actions";

  const btnContinue = document.createElement("button");
  btnContinue.className = "wrapperSummery__btnContinue";
  btnContinue.textContent = "CONTINUE SHOPPING";

  const btnCheckout = document.createElement("button");
  btnCheckout.className = "wrapperSummery__btnCheckout";
  btnCheckout.textContent = "CHECKOUT";

  summery.append(headingSummery, promoSection)
  
  promoRow.append(promoInput, promoBtn);
  promoSection.append(promoLable, promoRow);

  lines.append(subTotalText, shippingText);

  totalRowWrap.appendChild(totalText);

  actions.append(btnContinue, btnCheckout);

  wrapperSummery.append(summery, lines, totalRowWrap, actions);
  return wrapperSummery;
}

// Init
export const initCartPage = async () => {
  
  await Promise.resolve(findCart());

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

  const layout = document.createElement("div");
  layout.className = "cart__layout";

  const itemsCol = document.createElement("div");
  itemsCol.className = "cart__items";

  const summaryCol = document.createElement("div");
  summaryCol.className = "cart__summary";

  cart.items.forEach((item) => {
    itemsCol.appendChild(createCartItem(item, render));
  });

  summaryCol.appendChild(createOrderSummery(cart));

  layout.append(itemsCol, summaryCol);

  section.appendChild(layout);
};

  render();
};

initCartPage();