import { getCart, clearCart } from "../services/storage";

export function renderCheckout(app: HTMLDivElement): void {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  app.innerHTML = `
    <header class="topbar">
      <div class="brand__name">THE ICONIC SERIES</div>
      <nav class="nav">
        <a href="#cart" class="navlink">← Till varukorg</a>
        <a href="#home" class="navlink">Produkter</a>
      </nav>
    </header>

    <main class="container">
      <h2 class="sectionTitle">Checkout</h2>

      ${
        cart.length === 0
          ? `<p>Varukorgen är tom. <a href="#home">Gå till produkter</a></p>`
          : `
            <p><strong>Total:</strong> ${total} kr</p>
            <button class="btn wide" id="buyBtn">Slutför köp</button>
          `
      }
    </main>
  `;

  const buyBtn = app.querySelector<HTMLButtonElement>("#buyBtn");
  if (buyBtn) {
    buyBtn.addEventListener("click", () => {
      clearCart();
      window.location.hash = "#home";
    });
  }
}
