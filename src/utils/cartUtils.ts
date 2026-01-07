import { getProductsById } from "../services/productService";

export const createCart = () => {
  localStorage.setItem("cart", "[]");
};

export const findCart = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    console.log("a cart exists");
    console.log("this is cart:", cart);
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
};

// findCart();
// addItemToCart("1");
