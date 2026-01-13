import "../../scss/checkout.scss";

const shippingButtons = document.getElementsByName("shippingMethod");

shippingButtons?.forEach((btn) => {
  btn.addEventListener("change", () => {
    checkChosen();
  });
});

const checkChosen = () => {
  shippingButtons.forEach((btn) => {
    let parent = btn.parentElement;
    if ((btn as HTMLInputElement).checked) {
      parent?.classList.add("chosen");
    } else {
      parent?.classList.remove("chosen");
    }
  });
};
