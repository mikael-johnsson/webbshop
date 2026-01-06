import { renderHome } from "./pages/home";
import { renderCart } from "./pages/cart";
import { renderCheckout } from "./pages/checkout";

export function router(app: HTMLDivElement) {
  const hash = window.location.hash || "#home";

  if (hash.startsWith("#cart")) return renderCart(app);
  if (hash.startsWith("#checkout")) return renderCheckout(app);

  return renderHome(app);
}
