import ProductData from "./ProductData.mjs"
import ProductList from "./ProductList.mjs"

// Create an instance of ProductData
const productData = new ProductData("tents");


// Create an instance of ProductList
const productListing = new ProductList("tents", productData, listElement);
productListing.init();