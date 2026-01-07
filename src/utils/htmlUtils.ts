import { getData } from "../services/serviceBase";

export const createProductCard = async () => {
  const productResponse = await getData();
  const products = productResponse.products;

  products.forEach((product) => {
    const container = document.createElement("div");
    const buyContainer = document.createElement("div");
    const img = document.createElement("img");
    const category = document.createElement("div");
    const name = document.createElement("h3");
    const description = document.createElement("div");
    const price = document.createElement("span");
    const addButton = document.createElement("button");

    img.src = product.image;
    category.innerHTML = "placeholder";
    name.innerHTML = product.name;
    description.innerHTML = product.description;
    price.innerHTML = product.price.toString();
    addButton.innerHTML = "ADD TO CART";

    container.classList.add("productCardContainer");
    img.classList.add("productCardImg");
    category.classList.add("productCardCategory");
    name.classList.add("productCardName");
    description.classList.add("productCardDescription");
    price.classList.add("productCardPrice");
    addButton.classList.add("productCardButton");
    buyContainer.classList.add("buyContainer");

    buyContainer.appendChild(price);
    buyContainer.appendChild(addButton);

    container.appendChild(img);
    container.appendChild(category);
    container.appendChild(name);
    container.appendChild(description);
    container.appendChild(buyContainer);

    //change this to proper container in index.html
    document.getElementById("app")?.appendChild(container);
  });
};

createProductCard();
