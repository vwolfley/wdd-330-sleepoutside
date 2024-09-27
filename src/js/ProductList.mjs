import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img
          src="${product.Image}"
          alt="${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.products = [];
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  // Stretch Activity Week 2 #2
  // Filter the products that are available
  filterProducts(list) {
    return list.filter((product) => product.Available === true);
  }

  // Before Stretch Activity Week 2
  // Render the product listing
  // renderList(list) {
  //   const info = list.map((product) => productCardTemplate(product)).join("");
  //   this.listElement.innerHTML = info;
  // }

  // After Stretch Activity Week 2
  // Render the product listing
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  // Initialize the product listing and fetch the data
  async init() {
    const list = await this.dataSource.getData();
    // console.log(list);
    // Filter the list
    const filteredList = this.filterProducts(list);
    // Render the filtered list
    this.renderList(filteredList);
  }
}