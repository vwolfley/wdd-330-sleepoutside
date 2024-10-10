import { loadHeaderFooter, getParam, performSearch } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

// Load the header and footer
loadHeaderFooter();

const category = getParam("category");

// Create an instance of ExternalServices
const dataSource = new ExternalServices();
// Define the list element
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList
const productListing = new ProductList(category, dataSource, listElement);
productListing.init();
