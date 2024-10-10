import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  // e.target would contain our form in this case
  myCheckout.checkout();
});
