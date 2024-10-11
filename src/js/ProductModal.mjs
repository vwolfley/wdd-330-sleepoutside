import { getLocalStorage, setLocalStorage, cartSuperscript } from "./utils.mjs";

export default class ProductModal {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    const product = await this.dataSource.findProductById(this.productId);
    this.product = product;

    this.renderProductModal(product);

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

  renderProductModal(product) {
    // Check if a modal already exists, remove it to avoid duplicates
    const existingModal = document.getElementById("productModal");
    if (existingModal) {
      existingModal.remove();
    }
    // Create the modal HTML
    const modalHTML = `
    <div id="productModal" class="modal">
        <div class="modal-content">
          <div class="header">
            <h5>${product.Brand.Name}</h5>
            <button class="close-modal" type="button">X</button>
          </div>
          <div class="modal-body">
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${product.Images.PrimaryLarge}"
          alt="${product.Name}"
        />
    <p class="product-card__price">
      <span class="product-card__original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
      <span class="product-card__discount-price">${product.ListPrice}</span>
    </p>
        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
          </div>
          
        </div>
      </div>
    `;

    // Append modal HTML to the body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Get modal element
    const productModal = document.getElementById("productModal");
    productModal.style.display = "block";

    // Close the modal when clicking the 'X' button
    const closeBtn = productModal.querySelector(".close-modal");
    closeBtn.onclick = function () {
      productModal.style.display = "none";
    };

    // Close the modal if user clicks outside of the modal content
    window.onclick = function (event) {
      if (event.target === productModal) {
        productModal.style.display = "none";
      }
    };
  }
}
