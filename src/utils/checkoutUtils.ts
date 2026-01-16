import type { Cart } from "../models/Cart";
import { clearCart, updateCart } from "./cartUtils";
import { createCheckoutCart, createCheckoutConfirmation } from "./htmlUtils";

const shippingButtons = document.getElementsByName("shippingMethod");

shippingButtons?.forEach((btn) => {
  btn.addEventListener("change", () => {
    checkChosen();
    createCheckoutCart();
  });
});

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

export const checkShipping = () => {
  const shippingButtons = document.querySelectorAll<HTMLInputElement>(
    "[name=shippingMethod]"
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

//oklart hur detta ska visas - kanske som en modal? Eller under complete order-knapp?
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
