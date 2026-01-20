import "../../scss/checkout/checkout.scss";
import { initCartPop } from "../../utils/headerUtils";
import "../../utils/checkoutUtils";
import "../../utils/formUtils";
import "../../utils/headerUtils";
import { createCheckoutCart } from "../../utils/htmlUtils";

createCheckoutCart();
document.addEventListener("DOMContentLoaded", () => {
  initCartPop();
});
