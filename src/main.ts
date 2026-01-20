import "./scss/style.scss";
import "./scss/pdp.scss";
import "./services/productService";
import "./utils/cartUtils";
import "./utils/htmlUtils";
import "./utils/pageUtils";
import "./utils/headerUtils";
import { createAllCategories, createAllProductCards } from "./utils/htmlUtils";
import { findCart } from "./utils/cartUtils";
import "./utils/cartModalUtils";
import { initCartPop } from "./utils/cartModalUtils";

createAllProductCards();
findCart();
createAllCategories();

window.addEventListener("DOMContentLoaded", () => {
  findCart();
  initCartPop();
});
