import "../../scss/checkout/checkout.scss";
import { initCartPop } from "../../utils/headerUtils";
import "../../utils/checkoutUtils";
import "../../utils/formUtils";
import "../../utils/headerUtils";
import { createCheckoutCart } from "../../utils/htmlUtils";
import { makeRightSideSticky } from "../../utils/scrollCheckoutUtils";

createCheckoutCart();
document.addEventListener("DOMContentLoaded", () => {
  initCartPop();
  makeRightSideSticky();
});
