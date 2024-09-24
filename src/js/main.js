import ProductData from "./ProductData.mjs"
import ProductList from "./ProductList.mjs"

// Create an instance of ProductData
const productData = new ProductData("tents");

// Define the list element
const listElement = document.querySelector(".products-list");

// Create an instance of ProductList
const productListing = new ProductList("tents", productData, listElement);
productListing.init();