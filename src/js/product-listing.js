import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Load the header and footer
loadHeaderFooter();

// Create an instance of ProductData
const productData = new ProductData("tents");
// Define the list element
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList
const productListing = new ProductList("tents", productData, listElement);
productListing.init();