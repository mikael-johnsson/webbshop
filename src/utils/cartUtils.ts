import type { Product } from "../models/product";
import { getProductsById } from "../services/productService";

export const createCart = () => {
  localStorage.setItem("cart", "[]");
};

export const findCart = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    console.log("a cart exists");
  } else {
    console.log("cart does not exist");
    createCart();
  }
};

/**
 *
 * @param id the id of the product we are adding to the cart
 * find the full product based on id
 * get the current cart from local storage
 * if it exists, add the product to the cart
 * else, log error message
 */
export const addItemToCart = async (id: string) => {
  const product = await getProductsById(id);
  let cartString = localStorage.getItem("cart");
  if (cartString) {
    const cartArray = JSON.parse(cartString);
    cartArray.push(product);
    localStorage.setItem("cart", JSON.stringify(cartArray));
  } else {
    console.log("cart is empty");
  }

  console.log("this is cart:", localStorage.getItem("cart"));
};

/**
 *
 * @param id the id of the product we are removing from the cart
 * get the current cart from localStorage
 * parse to json
 * filter out every product that doesnt match the id param
 * add that new cart to localStorage
 */
export const removeProductFromCart = (id: string) => {
  let cartString = localStorage.getItem("cart");
  if (cartString) {
    const cartArray = JSON.parse(cartString);
    console.log("old cart:", cartArray);

    const newCartArray = cartArray.filter(
      (product: Product) => product.id !== parseFloat(id)
    );
    console.log("new cart:", newCartArray);

    localStorage.setItem("cart", JSON.stringify(newCartArray));
  } else {
    console.log("No cart was found :(");
  }
};

//remove one item

export const removeOneItemFromCart = (id: string) => {
  const cartString = localStorage.getItem("cart");
  if (!cartString) return;
  const cartArray = JSON.parse(cartString) as Product[];
  console.log("old cart:", cartArray);
  const numericID = Number(id);
  const index = cartArray.findIndex((product) => product.id === numericID);
  if (index === -1) return;
  cartArray.splice(index, 1);
  console.log("cart after:", cartArray);
  localStorage.setItem("cart", JSON.stringify(cartArray));
};
