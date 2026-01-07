import { getData } from "./serviceBase";

/**
 * This function can be used to filter the fetch
 */
export const getProductsById = async (id: string) => {
  const productResponse = await getData();
  const product = productResponse.products.find((p) => p.id === parseFloat(id));
  return product;
};

const product = await getProductsById("1");
// console.log("this is product with id 1:", product);
