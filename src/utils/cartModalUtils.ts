import type { Cart } from "../models/Cart";
console.log("cartPop.ts loaded");

const getCartFromLS = (): Cart | null => {
  const cartString = localStorage.getItem("cart");
  if (!cartString) return null;
  return JSON.parse(cartString);
};


export const renderCartPop = (cartPop: HTMLElement) => {
    const cart = getCartFromLS() as any;
    const items = cart?.items ?? [];

    if(!cartPop) return;
    cartPop.innerHTML = "";
    
    if(items.length === 0) {
        cartPop.innerHTML = `<p>YOUR CART IS EMPTY</p>`
        return;
    }

    items.forEach((item) => {

     
        const p = document.createElement("p");
        p.style.padding ="10px 20px";
        p.textContent = `${item.product.name} x ${item.amount}`

        cartPop.appendChild(p);
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

