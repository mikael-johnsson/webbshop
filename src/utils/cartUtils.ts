import type { Cart } from "../models/Cart";
import type { CartItem } from "../models/CartItem";
import { getProductById } from "../services/productService";

export const createCart = () => {
  let cart: Cart = {
    items: [],
  };

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const findCart = () => {
  const cart = localStorage.getItem("cart");
  if (!cart) {
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
  const product = await getProductById(id);
  if (!product) return;

  let cart: Cart = { items: [] };
  let cartString = localStorage.getItem("cart");

  if (cartString) {
    cart = JSON.parse(cartString);
  }

  if (cart.items.length !== 0) {
    let cartItem: CartItem | undefined = cart.items.find(
      (item) => item.product.id === parseFloat(id),
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
};

/**
 *
 * @param id the id of the product we are removing from the cart
 * get the current cart from localStorage
 * parse to json
 * filter out every product that doesnt match the id param
 * add that new cart to localStorage
 */
export const removeProductFromCart = (id: string, cart: Cart) => {
  const newItems = cart.items.filter(
    (item: CartItem) => item.product.id !== parseFloat(id),
  );

  cart.items = newItems;

  localStorage.setItem("cart", JSON.stringify(cart));
};

//remove one item

export const removeOneItemFromCart = (id: string) => {
  const cartString = localStorage.getItem("cart");
  if (!cartString) return;

  const cart: Cart = JSON.parse(cartString);

  cart.items.forEach((item: CartItem, index) => {
    if (item.product.id === parseFloat(id)) {
      item.amount -= 1;

      item.amount < 1 ? cart.items.splice(index, 1) : null;
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCart = (cart: Cart) => {
  if (cart.items.length === 0) {
    cart.shippingPrice = undefined;
  } else {
    cart.shippingPrice = 0;
  }
  const cartString = JSON.stringify(cart);
  localStorage.setItem("cart", cartString);
};

export const getCart = () => {
  const cartString = localStorage.getItem("cart");
  let cart: Cart = { items: [] };
  if (cartString) {
    cart = JSON.parse(cartString);
    return cart;
  } else {
    return cart;
  }
};

export const clearCart = () => {
  let cart: Cart = {
    items: [],
  };
  localStorage.setItem("cart", JSON.stringify(cart));
};
