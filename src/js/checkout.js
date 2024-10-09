import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const mycheckout = new CheckoutProcess("so-cart");
mycheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
// listening for click on the button
document.querySelector("#paySubmit").addEventListener("click", (e) => {
  e.preventDefault();

  myCheckout.checkout();
});
