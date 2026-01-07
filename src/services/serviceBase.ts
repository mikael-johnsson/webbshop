import type { ProductResponse } from "../models/ProductResponse";

/**
 *
 * @returns A productResponse object. It only consists of one attribute,
 * (products), which is an array of Product.
 */
export const getProducts = async () => {
  const response = await fetch("/products.json");
  const data: ProductResponse = await response.json();
  return data;
};
