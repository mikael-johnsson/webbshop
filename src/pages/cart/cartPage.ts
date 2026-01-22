import type { Cart } from "../../models/Cart";
import type { CartItem } from "../../models/CartItem";
import {
  addItemToCart,
  findCart,
  getCart,
  removeOneItemFromCart,
} from "../../utils/cartUtils";
import { initCartPop, updateHeaderCartAmount } from "../../utils/headerUtils";
import "..//../scss/cart.scss";

// export const getCartFromLS = (): Cart | null => {
//   const cartString = localStorage.getItem("cart");
//   if (!cartString) return null;
//   return JSON.parse(cartString);
// };

function createCartSection(): HTMLElement {
  const section = document.createElement("section");
  section.className = "cart";

  const h1 = document.createElement("h1");
  h1.className = "cart__title";
  h1.textContent = "YOUR CART";

  section.appendChild(h1);
  return section;
}

export function createEmptyCartView(message: string): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "cart-empty";

  const box = document.createElement("div");
  box.className = "cart-empty__box";

  const text = document.createElement("p");
  text.className = "cart-empty__text";
  text.textContent = message;

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
  qtyWrap.className = "cart-container__qtyWrap";

  const qtyText = document.createElement("span");
  qtyText.className = "qty";
  qtyText.textContent = String(item.amount);

  const buttonMinus = document.createElement("button");
  buttonMinus.className = "qty-minus";
  buttonMinus.textContent = "-";

  const buttonPlus = document.createElement("button");
  buttonPlus.className = "qty-plus";
  buttonPlus.textContent = "+";

  const actionsRow = document.createElement("div");
  actionsRow.className = "cart-actions";

  buttonPlus.addEventListener("click", async () => {
    await addItemToCart(String(item.product.id));
    onChange();
    updateHeaderCartAmount();
  });

  buttonMinus.addEventListener("click", () => {
    removeOneItemFromCart(String(item.product.id));
    onChange();
    updateHeaderCartAmount();
  });

  imgWrapper.appendChild(img);
  qtyWrap.append(buttonMinus, qtyText, buttonPlus);
  priceWrapper.append(productName, productPrice);
  actionsRow.appendChild(qtyWrap);
  cartContainer.append(imgWrapper, priceWrapper, actionsRow);

  return cartContainer;
}

function createOrderSummery(cart: Cart): HTMLElement {
  const wrapperSummery = document.createElement("aside");
  wrapperSummery.className = "wrapperSummery";

  /* ===== HEADING ===== */
  const headingSummery = document.createElement("p");
  headingSummery.className = "wrapperSummery__heading";
  headingSummery.textContent = "ORDER SUMMARY";

  /* ===== CALCULATIONS ===== */
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.amount,
    0
  );

  const shipping = cart.shippingPrice || 0;

  const storedDiscount = localStorage.getItem("discount");
  let discountAmount =
    storedDiscount === "SEBASTIAN"
      ? Math.round(subtotal * 0.2)
      : 0;

  /* ===== PROMO UI ===== */
  const promoSection = document.createElement("div");
  promoSection.className = "wrapperSummery__promo";

  const promoLabel = document.createElement("p");
  promoLabel.className = "wrapperSummery__lable";
  promoLabel.textContent = "PROMO CODE";

  const promoRow = document.createElement("div");
  promoRow.className = "wrapperSummery__promoRow";

  const promoInput = document.createElement("input");
  promoInput.className = "wrapperSummery__promoInput";
  promoInput.placeholder = "ENTER CODE";

  const promoBtn = document.createElement("button");
  promoBtn.className = "wrapperSummery__promoBtn";
  promoBtn.textContent = "SUBMIT";

  const discountText = document.createElement("p");
  discountText.style.display = discountAmount > 0 ? "block" : "none";
  discountText.textContent =
    discountAmount > 0
      ? `DISCOUNT (SEBASTIAN): -${discountAmount} SEK`
      : "";

  /* ===== PRICE ROWS ===== */
  const subTotalText = document.createElement("p");
  subTotalText.textContent = `SUBTOTAL: ${subtotal} SEK`;

  const shippingText = document.createElement("p");
  shippingText.textContent = `SHIPPING: ${shipping} SEK`;

  const totalText = document.createElement("p");
  totalText.textContent = `TOTAL: ${subtotal + shipping - discountAmount} SEK`;

  /* ===== PROMO LOGIC ===== */
  promoBtn.addEventListener("click", () => {
    const code = promoInput.value.trim().toUpperCase();

    if (code === "SEBASTIAN") {
      discountAmount = Math.round(subtotal * 0.2);

      discountText.textContent = `DISCOUNT (SEBASTIAN): -${discountAmount} SEK`;
      discountText.style.display = "block";

      totalText.textContent = `TOTAL: ${subtotal + shipping - discountAmount} SEK`;

      localStorage.setItem("discount", "SEBASTIAN");
    } else {
      alert("Invalid promo code");
    }
  });

  /* ===== BUILD DOM ===== */
  promoRow.append(promoInput, promoBtn);
  promoSection.append(promoLabel, promoRow, discountText);

  wrapperSummery.append(
    headingSummery,
    promoSection,        // PROMO före SUBTOTAL
    subTotalText,
    shippingText,
    totalText
  );

  return wrapperSummery;
}

// Init
export const initCartPage = async () => {
  if (typeof updateHeaderCartAmount === "function") {
  updateHeaderCartAmount();
}

  initCartPop();

  findCart();

  const main = document.getElementById("main");
  if (!main) {
    console.error('Hittar inte elementet med id="main" i HTML.');
    return;
  }

  const render = () => {
    const cart = getCart();

    main.innerHTML = "";
    const section = createCartSection();
    main.appendChild(section);

    if (!cart || cart.items.length === 0) {
      section.appendChild(createEmptyCartView("YOUR CART IS EMPTY"));
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