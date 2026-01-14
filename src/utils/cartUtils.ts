import type { Cart } from "../models/Cart";
import type { CartItem } from "../models/CartItem";
import type { Product } from "../models/product";
import { getProductsById } from "../services/productService";

export const createCart = () => {
  let cart: Cart = {
    items: [],
  };

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const findCart = () => {
  const cart = localStorage.getItem("cart");
  if (cart) {
    console.log("a cart exists");
  } else {
    console.log("cart does not exist, creating cart");
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
  console.log("adding item to cart");

  const product = await getProductsById(id);
  if (!product) return;

  let cart: Cart;
  let cartString = localStorage.getItem("cart");

  if (cartString) {
    cart = JSON.parse(cartString);
    console.log("this is cart after parse", cart);
  } else
    cart = {
      items: [],
    };

  if (cart.items.length !== 0) {
    let cartItem: CartItem | undefined = cart.items.find(
      (item) => item.product.id === parseFloat(id)
    );

    if (cartItem) {
      cartItem.amount += 1;
    } else {
      cartItem = {
        product: product,
        amount: 1,
      };
      cart.items.push(cartItem);
    }
  } else {
    let cartItem = {
      product: product,
      amount: 1,
    };
    cart.items.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

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
