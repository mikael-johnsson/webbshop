import type { Product } from "../../models/product";
import {
  addItemToCart,
  findCart,
  removeOneItemFromCart,
} from "../../utils/cartUtils";
import { getLastClickedProduct } from "../../utils/pageUtils";
import "../../scss/pdp.scss";
import "../../utils/headerUtils";
import { initCartPop, updateHeaderCartAmount } from "../../utils/headerUtils";
import {
  changeCarouselImageBtnFunction,
  getQtyInCart,
} from "../../utils/pdpUtils";

//render product function with html *done*

export const renderProduct = (product: Product) => {
  const titleEl = document.getElementById("pdp-title");
  if (!titleEl) return;
  titleEl.textContent = product.name;

  const priceEl = document.getElementById("pdpPrice");
  if (!priceEl) return;
  priceEl.textContent = `${product.price} sek`;

  const descEl = document.getElementById("pdp-desc");
  if (!descEl) return;
  descEl.textContent = product.description;

  const imgEl = document.getElementById(
    "pdp-main-img",
  ) as HTMLImageElement | null;
  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = `image of ${product.name} as a retro action figure`;
  }

  createThumbnails(product);
};

// initPdp funktion (const product - getLastCllicked, !product(redirect?), renderProduct  ) - *done*

export const initPdp = () => {
  // hämta produkt från localStorage
  const product = getLastClickedProduct();
  if (!product) {
    console.log("STOP: no product in localStorage");
    return;
  }

  renderProduct(product);
  initTabs(product);
  initQty(product);
};

//tabsInit(details, story, shipping) *done*

export const initTabs = (product: Product) => {
  const tabs = document.querySelectorAll<HTMLButtonElement>(".tab");
  const panel = document.getElementById("pdpPanel");
  if (!panel) return;

  //default
  panel.textContent = `Category: ${product.category}`;

  //click on tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));

      tab.classList.add("is-active");

      const tabName = tab.dataset.tab;
      if (tabName === "details") {
        panel.textContent = `Category: ${product.category}`;
      }
      if (tabName === "story") {
        panel.textContent = product.description;
      }

      if (tabName === "shipping") {
        panel.textContent = "Delivery 2-5 working days.";
      }
    });
  });
};

export const updateQty = (product: Product) => {
  const qtyEl = document.getElementById("qty-value") as HTMLSpanElement | null;
  if (!qtyEl) return;
  qtyEl.textContent = String(getQtyInCart(product.id));
};

//initQty

export const initQty = (product: Product) => {
  findCart();

  const qtyEl = document.getElementById("qty-value") as HTMLSpanElement | null;
  const minusBtn = document.getElementById(
    "qty-minus",
  ) as HTMLButtonElement | null;
  const plusBtn = document.getElementById(
    "qty-plus",
  ) as HTMLButtonElement | null;
  const addBtn = document.getElementById(
    "add-to-cart",
  ) as HTMLButtonElement | null;
  const checkoutButton = document.getElementById(
    "go-to-checkout",
  ) as HTMLButtonElement | null;

  if (!qtyEl || !minusBtn || !plusBtn || !addBtn || !checkoutButton) {
    console.warn("Qty-elements missing on site");
    return;
  }

  updateQty(product);

  plusBtn.addEventListener("click", async () => {
    await addItemToCart(String(product.id));
    updateQty(product);
    updateHeaderCartAmount();
  });

  minusBtn.addEventListener("click", () => {
    removeOneItemFromCart(String(product.id));
    updateQty(product);
    updateHeaderCartAmount();
  });

  addBtn.addEventListener("click", async () => {
    await addItemToCart(String(product.id));
    updateQty(product);
    updateHeaderCartAmount();
  });

  checkoutButton.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initCartPop();
  initPdp();
});

// Carousel
export const createThumbnails = (product: Product) => {
  const container = document.getElementById("pdp__thumbs__container");
  const mainImg = document.getElementById(
    "pdp-main-img",
  ) as HTMLImageElement | null;

  if (!container || !mainImg) return;

  // main image ska vara product.image
  mainImg.src = product.image;
  mainImg.alt = product.name;

  // product.image först -> sen karusell
  const images = [product.image, ...(product.carouselImages ?? [])];
  const TOTAL_SLOTS = 6;

  container.innerHTML = "";

  for (let i = 0; i < TOTAL_SLOTS; i++) {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("thumbnailContainer");

    if (images[i]) {
      const img = document.createElement("img");
      img.classList.add("thumbnail");
      img.src = images[i];
      img.alt = `Thumbnail ${i + 1}`;

      img.addEventListener("click", () => {
        mainImg.src = images[i];
        mainImg.alt = `This is image: ${i}`;
      });

      imgContainer.appendChild(img);
    } else {
      imgContainer.classList.add("placeholder");

      if (i === 0) imgContainer.classList.add("ph-blue");
      if (i === 1) imgContainer.classList.add("ph-black");
      if (i === 2) imgContainer.classList.add("ph-white");
    }

    container.appendChild(imgContainer);
  }
  changeCarouselImageBtnFunction(mainImg, images);
};
