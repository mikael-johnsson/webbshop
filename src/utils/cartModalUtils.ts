import type { Cart } from "../models/Cart";

console.log("cartPop.ts loaded");

const getCartFromLS = (): Cart | null => {
  const cartString = localStorage.getItem("cart");
  if (!cartString) return null;
  return JSON.parse(cartString);
};


export const renderCartPop = (cartPop: HTMLElement) => {
    const cart = getCartFromLS();
    if(!cart) return

    const items = cart?.items ?? [];

    if(!cartPop) return;
    cartPop.innerHTML = "";
    
    if(items.length === 0) {
        cartPop.innerHTML = `<p>YOUR CART IS EMPTY</p>`
        return;
    }

    items.forEach((item) => {
      const row = document.createElement("div");
      row.className ="cartRow"

      const img = document.createElement("img");
      img.className ="cartRow__img";
      img.src = item.product.image;
     
        const nameAmount = document.createElement("p");
        nameAmount.className ="cartRow__nameAmount";
        nameAmount.textContent = `${item.product.name} x ${item.amount}`

       const total = item.product.price * item.amount;
      const totalPrice = document.createElement("p");
      totalPrice.className = "cartRow__price"

      totalPrice.textContent = `${total} SEK`

        row.appendChild(img);
        row.appendChild(nameAmount)
        row.appendChild(totalPrice)
        cartPop.appendChild(row)
    });
    console.log("LS cart raw:", localStorage.getItem("cart"));
    console.log("cart parsed:", getCartFromLS());
};

export const initCartPop = () => {
    const cartLink = document.getElementById("cartLink")
    const cartPop = document.getElementById("cartPop")
    if(!cartLink || !cartPop) return;

    const open = () => {
        renderCartPop(cartPop);
        cartPop.classList.add("isOpen");
        cartPop.setAttribute("aria-hidden", "false");
        console.log("OPEN");
      };
    
      const close = () => {
        cartPop.classList.remove("isOpen");
        cartPop.setAttribute("aria-hidden", "true");
        console.log("CLOSE");
      };
    
      cartLink.addEventListener("mouseenter", open)
      cartLink.addEventListener("mouseleave", () => {
        setTimeout(() => {
          const hoverPop = cartPop.matches(":hover");
          const hoverLink = cartLink.matches(":hover");
          if (!hoverPop && !hoverLink) close();
        }, 80);
      });

    cartPop.addEventListener("mouseenter", open);
    cartPop.addEventListener("mouseleave", close);

    
    cartLink.querySelector("a")?.addEventListener("click", (e) => {
        e.preventDefault();
        open();
    })
};

export const openCartPopAfterAdd = () => {
    const cartPop = document.getElementById("cartPop");
    if (!cartPop) return;
  
    renderCartPop(cartPop);
    cartPop.classList.add("isOpen");
    cartPop.setAttribute("aria-hidden", "false");
  };

