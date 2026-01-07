import { getData } from "./serviceBase";

/**
 * This function can be used to filter the fetch
 */
export const getProducts = async () => {
  const productResponse = await getData();
  console.log("these are the fetched products:", productResponse);
};

getProducts();
