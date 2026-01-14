const handleShpInfoForm = (e: Event) => {
  e.preventDefault();
};

const shippingInfoForm = document.getElementById("shippingInfoForm");

if (shippingInfoForm) {
  shippingInfoForm.addEventListener("submit", handleShpInfoForm);
}
