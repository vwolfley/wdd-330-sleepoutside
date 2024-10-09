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
    //this.calculateOrdertotal();
  }

  calculateOrdertotal() {
    console.log(this.list)
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = this.list.map((item, index) => {
        
    })

    this.tax = (this.itemTotal * .06).toFixed(2);
    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const amountElement = document.querySelector("#subtotal");
    amountElement.innerHTML = this.itemTotal

    const taxElemnt = document.querySelector("#tax");
    taxElemnt.innerHTML = this.tax
  }
}
