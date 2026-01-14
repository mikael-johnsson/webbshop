import type { Cart } from "../models/Cart";
import type { Product } from "../models/product";
import { getProductsById } from "../services/productService";

// dessa funktioner ska flyttas till cartUtils.ts
const createCart = () => {
  let cart: Cart = {
    items: [],
  };
  localStorage.setItem("cartObject", JSON.stringify(cart));
  console.log("cartObject created");
};

export const findCart = () => {
  const cart = localStorage.getItem("cartObject");
  if (cart) {
    console.log("a cartObject already exists");
  } else {
    console.log("cartObject does not exist");
    createCart();
  }
};

export const addItemToCartObject = async (product: Product) => {
  let cartString = localStorage.getItem("cartObject");
  if (!cartString) return;

  let cart: Cart = JSON.parse(cartString);

  let index = cart.items.findIndex((item) => item.id === product.id);
  if (index != -1) {
    cart.items[index].amount += 1;
  } else {
    let item = {
      id: product.id,
      amount: 1,
    };
    cart.items.push(item);
  }

  localStorage.setItem("cartObject", JSON.stringify(cart));
};

export const removeOneItemFromCart = (id: string) => {
  const cartString = localStorage.getItem("cartObject");
  if (!cartString) return;
  const cart: Cart = JSON.parse(cartString);
  console.log("old cart:", cart);

  const numericID = Number(id);
  const index = cart.items.findIndex((item) => item.id === numericID);
  if (index === -1) {
    console.log("No item of that kind in the cart");
    return;
  }
  if (cart.items[index].amount > 0) {
    cart.items[index].amount -= 1;
  }

  console.log("cart after:", cart);
  localStorage.setItem("cartObject", JSON.stringify(cart));
};

findCart();
