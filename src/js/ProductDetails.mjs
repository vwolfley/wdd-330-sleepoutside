import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    const product = await this.dataSource.findProductById(this.productId);
    console.log(product);
    this.renderProductDetails(product);

    document.getElementById("addToCart")
      .addEventListener("click", () => this.addToCart(product));
  }

  addToCart(product) {
    const productList = getLocalStorage("so-cart") || [];
    productList.push(product);
    setLocalStorage("so-cart", productList);
  }

  renderProductDetails(product) {
    const detailsElement = document.querySelector(".product-detail");
    detailsElement.innerHTML = `
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${product.Image}"
          alt="${product.Name}"
        />
        <p class="product-card__price">${product.ListPrice}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    `;
  }
}
