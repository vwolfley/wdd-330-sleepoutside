import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.Qtd,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.calculateOrdertotal();
  }

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const amount = this.list.reduce(
      (amount, item) => amount + item.FinalPrice,
      0,
    );
    this.itemTotal = amount;
  }

  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

    this.shipping = this.list.reduce((totalCost, item, index) => {
      if (item.Qtd === 1 && index === 0) {
        totalCost += 10; // First item costs $10
      } else if (item.Qtd > 1 && index > 0) {
        totalCost += 2 * item.Qtd; // Each additional item costs $2
      } else {
        totalCost += 2;
      }
      return totalCost;
    }, 0);
    // console.log(this.shipping);

    this.tax = (this.itemTotal * 0.06).toFixed(2);

    this.orderTotal = this.itemTotal + this.shipping + parseFloat(this.tax);
    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const amountElement = document.querySelector("#subtotal");
    amountElement.innerHTML = this.itemTotal;

    const shippingElement = document.querySelector("#shipping");
    shippingElement.innerHTML = this.shipping.toFixed(2);

    const taxElement = document.querySelector("#tax");
    taxElement.innerHTML = this.tax;

    const orderTotalElement = document.querySelector("#order-total");
    orderTotalElement.innerHTML = this.orderTotal.toFixed(2);
  }

  async checkout(form) {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
}
