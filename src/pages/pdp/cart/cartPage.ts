// The base (section + h1)
function createCartSection(): HTMLElement {
    const section = document.createElement("section");
    section.className = "cart";

    const h1 = document.createElement("h1");
    h1.className = "cart__title";
    h1.textContent = "YOUR CART";

    section.appendChild(h1);
    return section;
}

// Empty cart view 
function createEmptyCartView(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "cart-empty";

    const box = document.createElement("div");
    box.className = "cart-empty__box";

    const text = document.createElement("p");
    text.className = "cart-empty__text";
    text.textContent = "YOUR CART IS EMPTY";

    const btn = document.createElement("button");
    btn.className = "btn"; 
    btn.textContent = "GO BACK";
    btn.addEventListener("click", () => history.back());

    box.appendChild(text);
    box.appendChild(btn);
    wrapper.appendChild(box);

    return wrapper;
}

// Filled cart view
function createFilledCartView(): HTMLElement {
    
}
