import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData();

const productId = getParam("product");
// console.log(productId);
// console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
product.init();
