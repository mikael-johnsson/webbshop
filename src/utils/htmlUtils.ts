import type { Product } from "../models/Product";
import { getData } from "../services/serviceBase";
import { setLastClickedProduct } from "./pageUtils";

export const createAllProductCards = async () => {
  const productResponse = await getData();
  const products = productResponse.products;

  products.forEach((product) => {
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
  category.innerHTML = "placeholder";
  name.innerHTML = product.name.toUpperCase();
  description.innerHTML = product.description;
  price.innerHTML = product.price.toString() + "SEK";
  addButton.innerHTML = "ADD TO CART";

  container.classList.add("productCard");
  imgContainer.classList.add("productImgContainer");
  img.classList.add("productCardImg");
  category.classList.add("productCardCategory");
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

  container.addEventListener("click", () => {
    setLastClickedProduct(product);
    window.location.href = "test.html"; // change this to pdp.html
  });

  document.getElementById("product-card-container")?.appendChild(container);
};
