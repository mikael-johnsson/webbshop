import "../../scss/checkout/checkout.scss";
import { initCartPop } from "../../utils/headerUtils";
import "../../utils/checkoutUtils";
import "../../utils/formUtils";
import "../../utils/headerUtils";
import { createCheckoutCart } from "../../utils/htmlUtils";
import { makeRightSideSticky } from "../../utils/scrollCheckoutUtils";

createCheckoutCart();
document.addEventListener('DOMContentLoaded', () => {
  initCartPop();
  makeRightSideSticky();
});
const promoObserver = new MutationObserver(() => {
  const subtotalEl = document.getElementById("subtotalPrice");
  const totalEl = document.getElementById("totalPrice");
  const priceMid = document.getElementById("priceMid");

  if (!subtotalEl || !totalEl || !priceMid) return;

  const discountCode = localStorage.getItem("discount");
  if (discountCode !== "SEBASTIAN") return;
  const subtotal = Number(subtotalEl.textContent?.replace("SEK", "").trim());

  if (isNaN(subtotal)) return;

  const discount = Math.round(subtotal * 0.2);
  const newTotal = subtotal - discount;

  if (document.getElementById("discountRow")) return;

  const discountRow = document.createElement("div");
  discountRow.className = "row";
  discountRow.id = "discountRow";

  const label = document.createElement("p");
  label.textContent = "DISCOUNT (SEBASTIAN)";

  const value = document.createElement("span");
  value.textContent = `- ${discount} SEK`;

  discountRow.append(label, value);
  priceMid.appendChild(discountRow);

  totalEl.textContent = String(newTotal);

  promoObserver.disconnect();
});

promoObserver.observe(document.body, {
  childList: true,
  subtree: true,
});
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.id !== "promoSubmitBtn") return;

  e.preventDefault(); // ⛔ не сабмітимо форму

  const input = document.getElementById("promoInput") as HTMLInputElement | null;
  const subtotalEl = document.getElementById("subtotalPrice");
  const totalEl = document.getElementById("totalPrice");
  const priceMid = document.getElementById("priceMid");

  if (!input || !subtotalEl || !totalEl || !priceMid) return;

  const code = input.value.trim().toUpperCase();
  if (code !== "SEBASTIAN") {
    alert("Invalid promo code");
    return;
  }

  // ❌ не застосовувати двічі
  if (document.getElementById("discountRow")) return;

  const subtotal = Number(subtotalEl.textContent?.replace(/\D/g, ""));
  if (isNaN(subtotal)) return;

  const discount = Math.round(subtotal * 0.2);
  const newTotal = subtotal - discount;

  // ➕ рядок DISCOUNT
  const discountRow = document.createElement("div");
  discountRow.className = "row";
  discountRow.id = "discountRow";

  const label = document.createElement("p");
  label.textContent = "DISCOUNT (SEBASTIAN)";

  const value = document.createElement("span");
  value.textContent = `- ${discount} SEK`;

  discountRow.append(label, value);
  priceMid.appendChild(discountRow);

  totalEl.textContent = String(newTotal);

  localStorage.setItem("discount", "SEBASTIAN");
});

