import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
// console.log(productId);

const dataSource = new ExternalServices();

const product = new ProductDetails(productId, dataSource);
product.init();
