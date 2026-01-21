import type { Cart } from "../models/Cart";

export const getQtyInCart = (productId: number) => {
  const cartString = localStorage.getItem("cart");
  if (!cartString) return 0;

  const cart = JSON.parse(cartString) as Cart;
  const item = cart.items.find((i) => i.product.id === productId);

  return item ? item.amount : 0;
};

export const changeCarouselImageBtnFunction = (
  mainImg: HTMLImageElement,
  images: string[],
) => {
  let currentIndex = 0;

  const backBtn = document.getElementById("backBtn");
  const nextBtn = document.getElementById("nextBtn");
  backBtn?.setAttribute("role", "button");
  backBtn?.setAttribute("aria-label", "Previous Image");
  nextBtn?.setAttribute("role", "button");
  nextBtn?.setAttribute("aria-label", "Next Image");

  nextBtn?.addEventListener("click", () => {
    currentIndex += 1;

    if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    mainImg.src = images[currentIndex];
  });

  backBtn?.addEventListener("click", () => {
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }
    mainImg.src = images[currentIndex];
  });
};
