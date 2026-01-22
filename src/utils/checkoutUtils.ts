import type { Cart } from "../models/Cart";
import { clearCart } from "./cartUtils";
import { createCheckoutCart, createCheckoutConfirmation } from "./htmlUtils";

const shippingButtons = document.getElementsByName("shippingMethod");

shippingButtons?.forEach((btn) => {
  btn.addEventListener("change", () => {
    checkChosen();
    createCheckoutCart();
  });
});

/**
 * Check which one of the shipping method buttons is checked
 * Add chosen class to the parent div if checked
 */
export const checkChosen = () => {
  shippingButtons.forEach((btn) => {
    let parent = btn.parentElement;
    if ((btn as HTMLInputElement).checked) {
      parent?.classList.add("chosen");
    } else {
      parent?.classList.remove("chosen");
    }
  });
};

/**
 * Check which one of the shipping method buttons is checked
 * @returns a string that says which button is clicked
 */
export const checkShipping = () => {
  const shippingButtons = document.querySelectorAll<HTMLInputElement>(
    "[name=shippingMethod]",
  );
  let shippingMethod: string = "";
  if (shippingButtons) {
    shippingButtons.forEach((btn) => {
      if (btn.checked) {
        shippingMethod = btn.value;
      }
    });
  }

  return shippingMethod;
};

/**
 * Gets the cart from localStorage
 * Checks if there are any items in the cart
 * If there are items in the cart -
 * create checkout confirmation and
 * clear cart
 * @returns nothing if cart is empty
 */
export const completeCheckout = () => {
  const cartString = localStorage.getItem("cart");
  if (!cartString) return;

  const cart: Cart = JSON.parse(cartString);
  if (cart.items.length === 0) return;

  let message = `Your order is complete! You have bought: `;
  cart.items.forEach((item) => {
    message += item.product.name;
  });

  createCheckoutConfirmation(cart);
  clearCart();
};
