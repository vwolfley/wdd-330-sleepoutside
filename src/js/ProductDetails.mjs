import { getLocalStorage, setLocalStorage, cartSuperscript } from "./utils.mjs";
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    const product = await this.dataSource.findProductById(this.productId);
    this.product = product;
    // console.log(product);
    this.renderProductDetails(product);
    this.handleBrandCrumbs();

    document
      .getElementById("addToCart")
      .addEventListener("click", () => this.addToCart(product));
  }

  addToCart(product) {
    const productList = getLocalStorage("so-cart") || [];

    const isExist = productList.find((item) => item.Id === product.Id);

    if (isExist) {
      isExist.FinalPrice += product.FinalPrice;
      isExist.Qtd += 1;
    } else {
      product.Qtd = 1;
      productList.push(product);
    }

    setLocalStorage("so-cart", productList);

    // Load cartSuperscript
    cartSuperscript();
  }

  handleBrandCrumbs() {
    const breadcrumbsElement = document.querySelector("#breadcrumbs");
    breadcrumbsElement.innerHTML = `<span class="path">${this.product.Category}</span>`
  }

  // Added suggested retail price and list price on line 36-39
  renderProductDetails(product) {
    const discountPercentage = ((product.SuggestedRetailPrice - product.ListPrice) / product.SuggestedRetailPrice) * 100;
    const detailsElement = document.querySelector(".product-detail");
    detailsElement.innerHTML = `
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${product.Images.PrimaryLarge}"
          alt="${product.Name}"
        />
    <p class="product-card__price">
      <span class="product-card__original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
      <span class="product-card__discount-price">${product.ListPrice}</span>
      <div class="discount-flag">
        <span>Save ${discountPercentage.toFixed(0)}%</span>
      </div>
    </p>
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
