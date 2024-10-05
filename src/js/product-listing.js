import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Load the header and footer
loadHeaderFooter();

const category = getParam("category");

// Create an instance of ProductData
const dataSource = new ProductData();
// Define the list element
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList
const productListing = new ProductList(category, dataSource, listElement);
productListing.init();
