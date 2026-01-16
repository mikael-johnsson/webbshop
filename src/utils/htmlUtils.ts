import type { Cart } from "../models/Cart";
import type { CartItem } from "../models/CartItem";
import type { Product } from "../models/product";
import { getData } from "../services/serviceBase";
import { addItemToCart, removeOneItemFromCart } from "./cartUtils";
import { checkShipping } from "./checkoutUtils";
import { setLastClickedProduct } from "./pageUtils";

/* ---LANDING PAGE---- */
export const createAllProductCards = async () => {
  const productResponse = await getData();
  const products = productResponse.products;

  products.forEach((product: Product) => {
    createProductCard(product);
  });
};

/**
 *  this html needs more styling to match the design
 * @param product a single product object
 */
export const createProductCard = (product: Product) => {
  const container = document.createElement("div");
  const buyContainer = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const category = document.createElement("div");
  const name = document.createElement("h3");
  const description = document.createElement("div");
  const price = document.createElement("span");
  const addButton = document.createElement("button");
  const removeButton = document.createElement("button");

  img.src = product.image;
  category.innerHTML = product.category;
  name.innerHTML = product.name.toUpperCase();
  description.innerHTML = product.description;
  price.innerHTML = product.price.toString() + "SEK";
  addButton.innerHTML = "ADD TO CART";
  removeButton.innerHTML = "remove one item";

  container.classList.add("productCard");
  imgContainer.classList.add("productImgContainer");
  img.classList.add("productCardImg");
  category.classList.add("productCardCategory");
  name.classList.add("productCardName");
  description.classList.add("productCardDescription");
  price.classList.add("productCardPrice");
  addButton.classList.add("productCardButton");
  removeButton.classList.add("productCardButton");
  buyContainer.classList.add("buyContainer");

  buyContainer.appendChild(price);
  buyContainer.appendChild(addButton);
  buyContainer.appendChild(removeButton);

  imgContainer.appendChild(img);

  container.appendChild(imgContainer);
  container.appendChild(category);
  container.appendChild(name);
  container.appendChild(description);
  container.appendChild(buyContainer);

  addButton.addEventListener("click", () => {
    addItemToCart(product.id.toString());
  });

  removeButton.addEventListener("click", () => {
    removeOneItemFromCart(product.id.toString());
  });

  imgContainer.addEventListener("click", () => {
    setLastClickedProduct(product);
    window.location.href = "pdp.html";
  });

  name.addEventListener("click", () => {
    setLastClickedProduct(product);
    window.location.href = "pdp.html";
  });

  document.getElementById("product-card-container")?.appendChild(container);
};

/* ---CHECKOUT PAGE---- */

export const createCheckoutCart = () => {
  const cartString = localStorage.getItem("cart");
  if (!cartString) return;

  const cart: Cart = JSON.parse(cartString);

  const shippingMethod = checkShipping();
  if (shippingMethod === "express") {
    cart.shippingPrice = 49;
  } else {
    cart.shippingPrice = 0;
  }

  const cartItemContainer = document.getElementById("priceTop");
  if (cartItemContainer) {
    cartItemContainer.innerHTML = "";
  }

  cart.items.forEach((item) => {
    createCheckoutCartItem(item);
  });

  let subTotal: number = 0;
  cart.items.forEach((item) => {
    subTotal += item.amount * item.product.price;
  });

  const subTotalEl = document.getElementById("subtotalPrice");
  if (subTotalEl) {
    subTotalEl.innerText = "$" + subTotal.toString();
  }

  const shippingPriceEl = document.getElementById("shippingPrice");
  if (shippingPriceEl) {
    shippingPriceEl.innerText = "$" + cart.shippingPrice?.toString();
  }

  const totalPriceEl = document.getElementById("totalPrice");
  if (totalPriceEl) {
    totalPriceEl.innerText = (subTotal + cart.shippingPrice).toString();
  }
};

export const createCheckoutCartItem = (item: CartItem) => {
  const product = item.product;

  const row = document.createElement("div");
  row.classList.add("priceRow");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("imgContainer");

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  imgContainer?.appendChild(img);

  const textContainer = document.createElement("div");
  textContainer.classList.add("textContainer");
  const name = document.createElement("p");
  const minusBtn = document.createElement("button");
  minusBtn.classList.add("minusBtn");
  const plusBtn = document.createElement("button");
  plusBtn.classList.add("plusBtn");
  const qty = document.createElement("span");
  qty.classList.add("qty");
  const price = document.createElement("p");

  name.innerText = product.name;
  minusBtn.innerText = "-";
  plusBtn.innerText = "+";
  qty.innerText = item.amount.toString();
  price.innerHTML = "$" + (product.price * item.amount).toString();

  minusBtn.addEventListener("click", () => {
    removeOneItemFromCart(item.product.id.toString());
    createCheckoutCart();
  });

  plusBtn.addEventListener("click", async () => {
    await addItemToCart(item.product.id.toString());
    createCheckoutCart();
  });

  textContainer?.appendChild(name);
  textContainer?.appendChild(minusBtn);
  textContainer?.appendChild(qty);
  textContainer?.appendChild(plusBtn);
  textContainer?.appendChild(price);

  row.appendChild(imgContainer);
  row.appendChild(textContainer);

  const container = document.getElementById("priceTop");
  container?.appendChild(row);
};

export const createCheckoutConfirmation = (cart: Cart) => {
  const cartSection = document.getElementById("priceCountSection");
  cartSection?.remove();

  const containerSection = document.getElementById("sectionRight");

  const confirmationSection = document.createElement("section");
  confirmationSection.className = "checkout-card confirmationSection";

  const heading = document.createElement("h2");
  heading.className = "confirmationHeading";
  heading.innerText = "Your order is complete!";

  const productContainer = document.createElement("div");
  productContainer.className = "productContainer";
  cart.items.forEach((item) => {
    const container = document.createElement("div");
    container.className = "row";
    const name = document.createElement("p");
    const qty = document.createElement("p");

    name.innerText = item.product.name;
    qty.innerText = `Qty: ${item.amount}`;

    container.appendChild(name);
    container.appendChild(qty);
    productContainer.appendChild(container);
  });

  const message = document.createElement("p");
  message.className = "confirmationMessage";
  message.innerText =
    "Please find more info about your order in the confirmation email sent to you.";

  confirmationSection.appendChild(heading);
  confirmationSection.appendChild(productContainer);
  confirmationSection.appendChild(message);

  containerSection?.appendChild(confirmationSection);
};
