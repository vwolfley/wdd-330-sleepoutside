import { getLocalStorage } from "./utils.mjs";

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
    console.log(this.list);
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
}
