function productCardTemplate(product) {
  return `
    <li class="product-card">
            <a href="product_pages/index.html?products">
              <img
                src=""
                alt=""
              />
              <h3 class="card__brand"></h3>
              <h2 class="card__name"></h2>
              <p class="product-card__price"></p>
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

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(product) {
    this.products = this.products.filter((p) => p !== product);
  }

  getProducts() {
    return this.products;
  }

  filterProducts() {
    return this.products.filter((product) => product.category === this.category);
  }
// Before Stretch Activity Week 2
  renderList(list) {
    this.listElement.innerHTML = list
      .map(productCardTemplate)
      .join("");
  }

  // After Stretch Activity Week 2

  // Initialize the product listing and fetch the data
  async init() {
    const list = await this.dataSource.getData();
    console.log(list);
    this.renderList(list);
  }
}
