// --- CHECKOUT PAGE ---
const checkoutForm = document.getElementById("checkoutForm") as HTMLFormElement;

const handleCheckoutForm = (e: Event) => {
  e.preventDefault();

  const firstNameInput = document.getElementById(
    "firstName"
  ) as HTMLInputElement;
  validateInputWithRegex(firstNameInput);

  const lastNameInput = document.getElementById("lastName") as HTMLInputElement;
  validateInputWithRegex(lastNameInput);

  const emailInput = document.getElementById("email") as HTMLInputElement;
  validateInputWithRegex(emailInput);

  const phoneInput = document.getElementById("phone") as HTMLInputElement;
  validateInputWithRegex(phoneInput);

  const streetData = (document.getElementById("street") as HTMLInputElement)
    .value;

  if (streetData.trim() === "") {
    console.log("Please enter a street address");
  }

  const additionalInput = document.getElementById(
    "additional"
  ) as HTMLInputElement;

  additionalInput.value ? validateInput(additionalInput) : null;

  const cityInput = document.getElementById("city") as HTMLInputElement;
  validateInput(cityInput);

  const stateInput = document.getElementById("state") as HTMLInputElement;
  validateInput(stateInput);

  const zipCodeInput = document.getElementById("zipCode") as HTMLInputElement;
  validateInputWithRegex(zipCodeInput);

  const countryInput = document.getElementById("country") as HTMLInputElement;
  validateInput(countryInput);

  const cardNumberInput = document.getElementById(
    "cardNumber"
  ) as HTMLInputElement;
  validateInputWithRegex(cardNumberInput);

  const cardHolderInput = document.getElementById(
    "cardHolder"
  ) as HTMLInputElement;
  validateInputWithRegex(cardHolderInput);

  const expDateInput = document.getElementById(
    "expiryDate"
  ) as HTMLInputElement;
  validateInput(expDateInput); // change to regex validation

  const cvvInput = document.getElementById("cvvCode") as HTMLInputElement;
  validateInput(cvvInput); // change to regex validation
};

if (checkoutForm) {
  checkoutForm.addEventListener("submit", handleCheckoutForm);
}

export const validateInputWithRegex = (element: HTMLInputElement) => {
  let regex: RegExp;
  if (element.type === "name") {
    regex = /^[A-Za-z-]+$/;
  } else if (element.type === "email") {
    regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  } else if (element.type === "number") {
    regex = /^[+0-9]+$/; // dubbelkolla denna - den tillåter +
  } else {
    regex = /^/;
  }

  const elementData = element.value;

  if (elementData.trim() === "" || !regex.test(elementData)) {
    console.log("Please enter a valid input at: ", element);
    createErrorMsg(element);
  }
};

export const validateInput = (element: HTMLInputElement) => {
  const elementData = element.value;

  if (elementData.trim() === "") {
    console.log("Please enter a valid input at: ", element);
    createErrorMsg(element);
  }
};

export const createErrorMsg = (element: HTMLInputElement) => {
  let parent = element.parentElement;
  const errMsg = document.createElement("p");
  errMsg.innerText = "Please enter a valid input";
  errMsg.classList.add("errorMessage");
  parent?.appendChild(errMsg);
  element.classList.add("badInput");

  setTimeout(() => {
    //detta kanske istället skulle försvinna om change i formulär-inputen
    errMsg.remove();
    element.classList.remove("badInput");
  }, 4500);
};
