import type { Cart } from "../models/Cart";
import type { CartItem } from "../models/CartItem";
import type { Product } from "../models/product";
import { getProductCategories } from "../services/productService";
import { getData } from "../services/serviceBase";
import { addItemToCart, removeOneItemFromCart } from "./cartUtils";
import { checkShipping } from "./checkoutUtils";
import { updateHeaderCartAmount } from "./headerUtils";
import { setLastClickedProduct } from "./pageUtils";

/* ---LANDING PAGE---- */
export const createAllProductCards = async (category: string = "all") => {
  const productCardContainer = document.getElementById(
    "product-card-container",
  );
  if (productCardContainer) {
    productCardContainer.innerHTML = "";
  }

  const productResponse = await getData();
  const products = productResponse.products;

  const categoryProducts = products.filter((product) => {
    if (category === "all") return product;
    if (product.category === category) return product;
  });

  let filteredProducts: Product[] = [];

  if (!categoryProducts) {
    filteredProducts = products;
  } else {
    filteredProducts = categoryProducts;
  }

  filteredProducts.forEach((product: Product) => {
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

  img.src = product.image;
  category.innerHTML = product.category.toUpperCase();
  name.innerHTML = product.name.toUpperCase();
  description.innerHTML = product.description;
  price.innerHTML = product.price.toString() + " SEK";
  addButton.innerHTML = "ADD TO CART";

  container.classList.add("productCard");
  imgContainer.classList.add("productImgContainer");
  img.classList.add("productCardImg");
  category.classList.add("productCardCategory");
  category.classList.add(product.category);
  name.classList.add("productCardName");
  description.classList.add("productCardDescription");
  price.classList.add("productCardPrice");
  addButton.classList.add("productCardButton");
  buyContainer.classList.add("buyContainer");

  buyContainer.appendChild(price);
  buyContainer.appendChild(addButton);

  imgContainer.appendChild(img);

  container.appendChild(imgContainer);
  container.appendChild(category);
  container.appendChild(name);
  container.appendChild(description);
  container.appendChild(buyContainer);

  addButton.addEventListener("click", async (event: Event) => {
    event?.stopPropagation();
    await addItemToCart(product.id.toString());
    updateHeaderCartAmount();
  });

  container.addEventListener("click", () => {
    setLastClickedProduct(product);
    window.location.href = "pdp.html";
  });

  document.getElementById("product-card-container")?.appendChild(container);
};

/* ---CHECKOUT PAGE---- */

/**
 * Checks if the cart is empty
 * if so - create empty cart message
 * else create html that shows the subtotal,
 * shipping cost and total cost
 * @returns nothing if no cart or empty cart
 */
export const createCheckoutCart = () => {
  const cartString = localStorage.getItem("cart");
  if (!cartString) return;

  const cart: Cart = JSON.parse(cartString);

  if (cart.items.length === 0) {
    createEmptyCartMessage();
    return;
  }

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
    subTotalEl.innerText = subTotal.toString() + " SEK";
  }

  const shippingPriceEl = document.getElementById("shippingPrice");
  if (shippingPriceEl) {
    shippingPriceEl.innerText = cart.shippingPrice?.toString() + " SEK";
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
  const qtyContainer = document.createElement("div");
  qtyContainer.classList.add("qtyContainer");
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
  price.innerHTML = (product.price * item.amount).toString() + " SEK";

  minusBtn.addEventListener("click", () => {
    removeOneItemFromCart(item.product.id.toString());
    createCheckoutCart();
    updateHeaderCartAmount();
  });

  plusBtn.addEventListener("click", async () => {
    await addItemToCart(item.product.id.toString());
    createCheckoutCart();
    updateHeaderCartAmount();
  });

  qtyContainer?.appendChild(minusBtn);
  qtyContainer?.appendChild(qty);
  qtyContainer?.appendChild(plusBtn);

  textContainer?.appendChild(name);
  textContainer?.appendChild(qtyContainer);
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

  const stamp = document.createElement("div");
  stamp.className = "approvedStamp";
  stamp.setAttribute("aria-hidden", "true");

  stamp.innerHTML = `<div class ="approvedStamp__inner">
    <div class ="approvedStamp__top"> APPROVED</div>
    <div class ="approvedStamp__bottom"> CHECKOUT COMPLETE
    </div>`;

  containerSection?.appendChild(stamp);

  requestAnimationFrame(() => stamp.classList.add("is-in"));
  setTimeout(() => {
    stamp.classList.add("is-out");
    setTimeout(() => stamp.remove(), 200);
  }, 2500);
};

const createEmptyCartMessage = () => {
  const section = document.getElementById("priceCountSection");
  if (!section) return;

  section.innerHTML = "";
  section.classList.add("emptyCartMessage");
  const message = document.createElement("p");
  message.innerHTML =
    "Your cart seems to be empty. Go back and add some of your favourites!";

  section?.appendChild(message);
};

export const createAllCategories = async () => {
  const categories = await getProductCategories();

  const container = document.getElementById("category-container");
  const box = document.createElement("div");
  const heading = document.createElement("h4");

  box.setAttribute("role", "button");
  box.setAttribute("aria-label", "Sort by all categories");
  box.classList.add("categoryBox");
  heading.innerHTML = "ALL";
  heading.classList.add("categoryHeading");

  box.addEventListener("click", () => {
    createAllProductCards();
  });

  box.appendChild(heading);
  container?.appendChild(box);

  categories.forEach((category) => {
    createCategory(category);
  });
};

const createCategory = (category: string) => {
  const container = document.getElementById("category-container");
  const box = document.createElement("div");
  const heading = document.createElement("h4");

  box.setAttribute("aria-label", `Sort by category: ${category}`);
  box.setAttribute("role", "button");
  box.classList.add("categoryBox");
  box.classList.add(category);
  heading.innerHTML = category.toUpperCase();
  heading.classList.add("categoryHeading");

  box.addEventListener("click", () => {
    createAllProductCards(category);
    const productCardSection = document.getElementById("product-card-section");
    productCardSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  box.appendChild(heading);
  container?.appendChild(box);
};
