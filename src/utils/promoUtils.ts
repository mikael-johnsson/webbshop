export const createPromoErrorMsg = (reason: string) => {
  const container = document.createElement("div");
  const text = document.createElement("p");
  text.classList.add("promoError");
  container.appendChild(text);

  if (reason === "invalid") {
    text.innerText = "ENTERED CODE IS INVALID";
  } else {
    text.innerText = "VALID CODE ALREADY ENTERED";
  }

  return container;
};
