import type { Cart } from "../models/Cart";
import { initCartPage } from "../pages/cart/cartPage";
import { updateQty } from "../pages/pdp/pdp";
import { addItemToCart, getCart, removeOneItemFromCart } from "./cartUtils";
import { createCheckoutCart } from "./htmlUtils";
import { getLastClickedProduct } from "./pageUtils";

// --- HAMBURGER MENU ---
const hamburgerButton = document.getElementById("hamburgerButton");
const hamburgerMenu = document.getElementById("hamburgerMenu");

if (hamburgerButton) {
  hamburgerButton.addEventListener("click", () => {
    hamburgerMenu?.classList.toggle("headerHidden");
  });
}

// --- CART AMOUNT ---
export const updateHeaderCartAmount = () => {
  const cart: Cart = getCart();

  let totalAmount: number = 0;

  cart.items.forEach((item) => {
    totalAmount += item.amount;
  });
  const cartAmount = document.getElementById("cartAmount");

  if (!cartAmount) return;

  if (totalAmount > 0) {
    cartAmount.innerHTML = totalAmount.toString();
    cartAmount.classList.remove("headerHidden");
  } else {
    cartAmount.classList.add("headerHidden");
  }
};

// --- CART POPUP ---

// get cart from local storage
const getCartFromLS = (): Cart | null => {
  const cartString = localStorage.getItem("cart");
  if (!cartString) return null;
  return JSON.parse(cartString);
};

// render cart popup
export const renderCartPop = (cartPop: HTMLElement) => {
  const cart = getCartFromLS();
  const items = cart?.items ?? [];

  cartPop.innerHTML = "";

  // cart is empty
  if (items.length === 0) {
    cartPop.innerHTML = `<p>YOUR CART IS EMPTY</p>`;
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cartRow";

    const img = document.createElement("img");
    img.className = "cartRow__img";
    img.src = item.product.image;

    const nameAmount = document.createElement("p");
    nameAmount.className = "cartRow__nameAmount";
    nameAmount.textContent = `${item.product.name} x ${item.amount}`;

    const totalPrice = document.createElement("p");
    totalPrice.className = "cartRow__price";
    totalPrice.textContent = `${item.product.price * item.amount} SEK`;

    const btnWrap = document.createElement("div");
    btnWrap.className = "cart-qty";

    const buttonMinus = document.createElement("button");
    buttonMinus.className = "qty-minus";
    buttonMinus.type = "button";
    buttonMinus.textContent = "-";

    const buttonPlus = document.createElement("button");
    buttonPlus.className = "qty-plus";
    buttonPlus.type = "button";
    buttonPlus.textContent = "+";

    // minus item
    buttonMinus.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      removeOneItemFromCart(String(item.product.id));
      renderCartPop(cartPop);
      updateMainAfterCartPopChange();
      updateHeaderCartAmount();
    });

    // add item
    buttonPlus.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await addItemToCart(String(item.product.id));
      renderCartPop(cartPop);
      updateMainAfterCartPopChange();
      updateHeaderCartAmount();
    });

    btnWrap.appendChild(buttonMinus);
    btnWrap.appendChild(buttonPlus);

    row.appendChild(img);
    row.appendChild(nameAmount);
    row.appendChild(totalPrice);
    row.appendChild(btnWrap);

    cartPop.appendChild(row);
  });

  const buttonRow = document.createElement("div");
  buttonRow.className = "buttonRow";

  const checkoutButton = document.createElement("button");
  checkoutButton.innerHTML = "GO TO CHECKOUT";
  checkoutButton.className = "go-to-checkout";

  const cartButton = document.createElement("button");
  cartButton.innerHTML = "GO TO CART";
  cartButton.className = "go-to-cart";

  cartButton.addEventListener("click", () => {
    window.location.href = "cartpage.html";
  });

  checkoutButton.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

  buttonRow.appendChild(checkoutButton);
  buttonRow.appendChild(cartButton);
  cartPop.appendChild(buttonRow);
};

// init cart popup
export const initCartPop = () => {
  const cartLink = document.getElementById("cartLink");
  const cartPop = document.getElementById("cartPop");
  if (!cartLink || !cartPop) return;

  const link = cartLink.querySelector("a");

  let isOpen = false;

  const open = () => {
    renderCartPop(cartPop);
    cartPop.classList.add("isOpen");
    cartPop.setAttribute("aria-hidden", "false");
    isOpen = true;
  };

  const close = () => {
    cartPop.classList.remove("isOpen");
    cartPop.setAttribute("aria-hidden", "true");
    isOpen = false;
  };

  // hover = open only
  cartLink.addEventListener("mouseenter", () => {
    if (!isOpen) open();
  });

  // click icon = toggle
  link?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    isOpen ? close() : open();
  });

  // stop clicks inside popup
  cartPop.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // click outside = close
  document.addEventListener("pointerdown", (e) => {
    const target = e.target as Node;
    if (cartPop.contains(target) || cartLink.contains(target)) return;
    close();
  });

  // esc = close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
};

// open popup after add to cart
export const openCartPopAfterAdd = () => {
  const cartPop = document.getElementById("cartPop");
  if (!cartPop) return;

  renderCartPop(cartPop);
  cartPop.classList.add("isOpen");
  cartPop.setAttribute("aria-hidden", "false");
};

const updateMainAfterCartPopChange = () => {
  const path = window.location.pathname;
  if (path === "/pdp.html") {
    const product = getLastClickedProduct();
    if (product) {
      updateQty(product);
    }
    updateHeaderCartAmount();
  } else if (path === "/checkout.html") {
    createCheckoutCart();
    updateHeaderCartAmount();
  } else if (path === "/cartpage.html") {
    initCartPage();
    updateHeaderCartAmount();
  } else if (path === "/") {
    updateHeaderCartAmount();
  }
};

updateHeaderCartAmount();
