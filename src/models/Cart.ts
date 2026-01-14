import type { CartItem } from "./CartItem";

export type Cart = {
  items: CartItem[];
  cartDiscount?: number;
  shippingPrice?: number;
};
