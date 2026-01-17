import type { Product } from "../../models/product";

export const createThumbnails = (product: Product) => {
  const container = document.getElementById("pdp__thumbs__container");
  const mainImg = document.getElementById("pdp-main-img") as HTMLImageElement | null;

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
};
