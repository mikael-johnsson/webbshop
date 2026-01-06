import type { Cart } from "../types/cart";

const CART_KEY = "webshop_cart";

export function getCart(): Cart {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Cart;
  } catch {
    return [];
  }
}

export function saveCart(cart: Cart): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}
