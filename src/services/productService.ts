import { getData } from "./serviceBase";

/**
 * This function can be used to filter the fetch
 */
export const getProducts = async () => {
  const productResponse = await getData();
  return productResponse.products;
};

export const getProductsById = async (id: string) => {
  const productResponse = await getData();
  const product = productResponse.products.find((p) => p.id === parseFloat(id));
  return product;
};
