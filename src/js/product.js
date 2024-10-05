import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
// console.log(productId);

const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();
