import type { Product } from "../../models/product";

export const createThumbnails = (product: Product) => {
  const container = document.getElementById("pdp__thumbs__container");
  const mainImg = document.getElementById("pdp-main-img") as HTMLImageElement;

  for (let i = 0; i < 5; i++) {
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");

    imgContainer.classList.add("thumbnailContainer");

    img.src = product.image;
    img.classList.add("thumbnail");

    img.addEventListener("click", () => {
      console.log("clicked image");
      if (mainImg) {
        console.log("mainimage exists");

        mainImg.src = product.image;
        mainImg.alt = `This is image: ${i}`;
      }
    });

    imgContainer?.appendChild(img);
    container?.appendChild(imgContainer);
  }
};
