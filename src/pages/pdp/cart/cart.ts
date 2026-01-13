// The base (section + h1) //
function createCartSection(): HTMLElement {
    const section = document.createElement("section");
    section.className = "cart";

    const h1 = document.createElement("h1");
    h1.className = "cart__title";
    h1.textContent = "YOUR CART";

    section.appendChild(h1);
    return section;
}