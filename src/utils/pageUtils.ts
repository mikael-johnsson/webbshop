import type { Product } from "../models/Product";

/**
 *
 * @param product a single product object
 */
export const setLastClickedProduct = (product: Product) => {
  const productString = JSON.stringify(product);
  localStorage.setItem("lastProduct", productString);
};

/**
 *
 * @returns a single product object located in localStorage or null
 */
export const getLastClickedProduct = () => {
  const lastClickedProductString = localStorage.getItem("lastProduct");
  if (lastClickedProductString) {
    const product: Product = JSON.parse(lastClickedProductString);
    return product;
  } else {
    console.log("No lastProduct found in localStorage");
  }
};
