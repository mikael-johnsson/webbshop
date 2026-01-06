import { getCart, saveCart } from "../services/storage";

function totalPrice(): number {
  return getCart().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function renderCart(app: HTMLDivElement): void {
  const cart = getCart();

  app.innerHTML = `
    <header class="topbar">
      <div class="brand__name">THE ICONIC SERIES</div>
      <a class="cartlink" href="#home">← Tillbaka</a>
    </header>

    <main class="container">
      <h2 class="sectionTitle">Varukorg</h2>

      ${
        cart.length === 0
          ? `<p>Din varukorg är tom. <a href="#home">Gå till produkter</a></p>`
          : `
            <section class="cart">
              ${cart
                .map(
                  (item) => `
                  <div class="cartrow">
                    <div class="cartinfo">
                      <strong>${item.product.title}</strong>
                      <small>${item.product.category}</small>
                    </div>

                    <div class="cartactions">
                      <button class="btnIcon" data-dec="${item.product.id}">-</button>
                      <span class="qty">${item.quantity}</span>
                      <button class="btnIcon" data-inc="${item.product.id}">+</button>
                    </div>

                    <div class="cartprice">${item.product.price * item.quantity} kr</div>
                  </div>
                `
                )
                .join("")}

              <div class="carttotal">
                <strong>Total:</strong> ${totalPrice()} kr
              </div>

              <a class="btn wide" href="#checkout">Gå till checkout</a>
            </section>
          `
      }
    </main>
  `;

  function updateQuantity(id: string, delta: number) {
    const newCart = getCart();
    const item = newCart.find((x) => x.product.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      const idx = newCart.findIndex((x) => x.product.id === id);
      newCart.splice(idx, 1);
    }

    saveCart(newCart);
    renderCart(app);
  }

  app.querySelectorAll<HTMLButtonElement>("button[data-inc]").forEach((b) => {
    b.addEventListener("click", () => updateQuantity(b.dataset.inc!, 1));
  });

  app.querySelectorAll<HTMLButtonElement>("button[data-dec]").forEach((b) => {
    b.addEventListener("click", () => updateQuantity(b.dataset.dec!, -1));
  });
}
