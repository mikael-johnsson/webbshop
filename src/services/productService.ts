import { getData } from "./serviceBase";

/**
 * This function can be used to filter the fetch
 */
export const getProducts = async () => {
  const productResponse = await getData();
  return productResponse.products;
};

export const getProductById = async (id: string) => {
  const productResponse = await getData();
  const product = productResponse.products.find((p) => p.id === parseFloat(id));
  return product;
};

export const getProductCategories = async () => {
  const products = await getProducts();
  let categories: string[] = [];

  products.forEach((item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
  });

  return categories;
};
