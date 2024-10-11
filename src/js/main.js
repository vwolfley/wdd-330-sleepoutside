// import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Modal from "./modal.mjs";

// Create an instance of ExternalServices
// const ExternalServices = new ExternalServices("tents");

// Define the list element
// const listElement = document.querySelector(".product-list");

// Create an instance of ProductList
// const productListing = new ProductList("tents", ExternalServices, listElement);
// productListing.init();
const title = "🎁 Register Now & Win! 🎁";
const message = "Sign up on your first visit and get a chance to win premium camping gear – tents, sleeping bags, and more! 🏕️";
const modal = new Modal(title, message, true);
modal.ShowModal();

loadHeaderFooter();
