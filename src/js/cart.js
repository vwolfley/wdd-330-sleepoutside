import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const shoppingCart = new ShoppingCart();
shoppingCart.renderCartContents();
