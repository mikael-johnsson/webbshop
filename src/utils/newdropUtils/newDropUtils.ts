// new drops landing page

import type { Product } from "../../models/product";
import { getData } from "../../services/serviceBase";
import { createProductCard } from "../htmlUtils";

export const createNewDropsCards = async (category: string = "all", newDropOnly: boolean = false) => {
  const productCardContainer = document.getElementById(
    "product-card-container",
  );
  if (productCardContainer) {
    productCardContainer.innerHTML = "";
  }

  const productResponse = await getData();
  const products = productResponse.products

  const categoryProducts = products.filter((product) => {
    if (category === "all") return product;
    if (product.category === category) return product;
  });

  let filteredProducts: Product[] = [];
  
if(newDropOnly) {
    filteredProducts = categoryProducts.filter((product) => product.newDrop === true)
} else {
    filteredProducts = categoryProducts
}




  filteredProducts.forEach((product: Product) => {
    createProductCard(product);
  });
};