import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter()

// Get category type from url
const category = getParams("category");

// Added category to header
const title = category.charAt(0).toUpperCase() + category.slice(1);
document.querySelector(".title").textContent = title;

// Create an instance of ProductData
const productData = new ProductData();

// Define the list element
const listElement = document.querySelector(".product-list");

// Create an instance of ProductList
const productListing = new ProductList(category, productData, listElement);
productListing.init();
