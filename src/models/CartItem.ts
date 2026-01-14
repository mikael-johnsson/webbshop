import type { Product } from "./product";

export type CartItem = {
  product: Product;
  amount: number;
};
