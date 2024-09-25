import { getLocalStorage, setLocalStorage, getParams} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ProductData("tents");

const productId = getParams('product');
console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
product.init();

// function addProductToCart(product) {
//   const productList = getLocalStorage("so-cart") || []
//   productList.push(product)
//   setLocalStorage("so-cart", productList);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
