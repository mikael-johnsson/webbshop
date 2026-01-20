import { completeCheckout } from "./checkoutUtils";

// --- CHECKOUT PAGE ---
const checkoutForm = document.getElementById("checkoutForm") as HTMLFormElement;

const handleCheckoutForm = (e: Event) => {
  e.preventDefault();

  const firstNameInput = document.getElementById(
    "firstName",
  ) as HTMLInputElement;
  const lastNameInput = document.getElementById("lastName") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const phoneInput = document.getElementById("phone") as HTMLInputElement;
  const streetInput = document.getElementById("street") as HTMLInputElement;
  const cityInput = document.getElementById("city") as HTMLInputElement;
  const stateInput = document.getElementById("state") as HTMLInputElement;
  const zipCodeInput = document.getElementById("zipCode") as HTMLInputElement;
  const countryInput = document.getElementById("country") as HTMLInputElement;
  const cardNumberInput = document.getElementById(
    "cardNumber",
  ) as HTMLInputElement;
  const cardHolderInput = document.getElementById(
    "cardHolder",
  ) as HTMLInputElement;
  const expDateInput = document.getElementById(
    "expiryDate",
  ) as HTMLInputElement;
  const cvvInput = document.getElementById("cvvCode") as HTMLInputElement;

  const regexInputs = [
    firstNameInput,
    lastNameInput,
    emailInput,
    phoneInput,
    zipCodeInput,
    cardNumberInput,
    cardHolderInput,
  ];

  const nonRegexInputs = [
    streetInput,
    cityInput,
    stateInput,
    countryInput,
    expDateInput,
    cvvInput,
  ];

  const regexResults = regexInputs.map((input) =>
    validateInputWithRegex(input),
  );
  const regexResultsValid = regexResults.every((result) => result === true);

  const nonRegexResults = nonRegexInputs.map((input) => validateInput(input));
  const nonRegexResultsValid = nonRegexResults.every(
    (result) => result === true,
  );

  if (regexResultsValid && nonRegexResultsValid) {
    completeCheckout();
  } else {
    console.log("some input field is not valid");
  }
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
    createErrorMsg(element);
    return false;
  }
  return true;
};

export const validateInput = (element: HTMLInputElement) => {
  const elementData = element.value;

  if (elementData.trim() === "") {
    createErrorMsg(element);
    return false;
  }
  return true;
};

export const createErrorMsg = (element: HTMLInputElement) => {
  let parent = element.parentElement;
  const errMsg = document.createElement("p");
  errMsg.innerText = "Please enter a valid input";
  errMsg.classList.add("errorMessage");
  parent?.appendChild(errMsg);
  element.classList.add("badInput");

  setTimeout(() => {
    errMsg.remove();
    element.classList.remove("badInput");
  }, 4500);
};

/*  add eventlistener that when focues, remove the error class (a red border) 
    and remove all elements with the class errorMessage
*/
const inputs = document.getElementsByTagName("input");
for (let input of inputs) {
  input.addEventListener("focus", () => {
    for (let i of inputs) {
      i.classList.remove("badInput");
      removeErrorMessage();
    }
  });
}

const removeErrorMessage = () => {
  const errorMessages = document.getElementsByClassName("errorMessage");
  for (let msg of errorMessages) {
    msg.remove();
  }
};
