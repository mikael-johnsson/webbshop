import { initCartPage } from "./cartPage.ts";
import { findCart } from "../../utils/cartUtils";
import { initCartPop } from "../../utils/headerUtils";

findCart();

window.addEventListener("DOMContentLoaded", () => {
  initCartPop();
  initCartPage();
});
