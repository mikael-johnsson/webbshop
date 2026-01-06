import { products } from "../data/products";
import { getCart, saveCart } from "../services/storage";
import type { CartItem } from "../types/cart";

function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(productId: string): void {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.product.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    const newItem: CartItem = { product, quantity: 1 };
    cart.push(newItem);
  }

  saveCart(cart);
}

export function renderHome(app: HTMLDivElement): void {
  app.innerHTML = `
    <header class="topbar">
      <div class="brand">
        <div class="brand__name">THE ICONIC SERIES</div>
        <a class="brand__link" href="#home">All Figures</a>
      </div>

      <a class="cartlink" href="#cart">
        🛒 Varukorg: <span id="cartCount">${getCartCount()}</span>
      </a>
    </header>

    <main class="container">
      <section class="hero">
        <h1 class="hero__title">THE ACTION FIGURES THAT<br/>WERE NEVER APPROVED</h1>
        <p class="hero__sub">Limited drop • 89 kr / figur</p>
      </section>

      <h2 class="sectionTitle">ALL FIGURES</h2>

      <section class="grid">
        ${products
          .map(
            (p) => `
            <article class="card">
              <div class="imgbox">
                <img src="${p.image}" alt="${p.title}" />
              </div>

              <div class="meta">
                <span class="tag">${p.category}</span>
                <h3 class="title">${p.title}</h3>
                <p class="desc">${p.description}</p>

                <div class="priceRow">
                  <span class="price">${p.price} kr</span>
                  <button class="btn" data-id="${p.id}">ADD TO CART</button>
                </div>
              </div>
            </article>
          `
          )
          .join("")}
      </section>
    </main>
  `;

  app.querySelectorAll<HTMLButtonElement>("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (!id) return;
      addToCart(id);

      const cartCountEl = app.querySelector<HTMLSpanElement>("#cartCount");
      if (cartCountEl) cartCountEl.textContent = String(getCartCount());
    });
  });
}
