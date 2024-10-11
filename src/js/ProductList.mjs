import { renderListWithTemplate } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductModal from "./ProductModal.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img
          src="${product.Images.PrimaryMedium}"
          alt="${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">
          <span class="product-card__original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span>
          <span class="product-card__discount-price">$${product.ListPrice}</span>
        </p>
        </a>
        <button id="quickViewBtn" class="button--small" data-id="${product.Id}">Quick View</button>
    </li>`;
}

function errorTemplate() {
  return `
    <div class="product-error">
      <p>Sorry we could not find that product for you!  Please select again.</p>
    </div>`;
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

  // Sort the products/list by price or name
  sortList(list, criteria) {
    if (criteria === "name") {
      return list.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (criteria === "price") {
      return list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    return list;
  }

  // Render the product listing
  renderList(list) {
    this.listElement.innerHTML = ""; // Clear the current list before rendering
    if (list.length === 0) {
      renderListWithTemplate(
        errorTemplate,
        this.listElement,
        list,
        "afterend",
        false,
      );
    }
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  handleBrandCrumbs() {
    const breadcrumbsElement = document.querySelector("#breadcrumbs");
    breadcrumbsElement.innerHTML = `<span class="path">${this.category}</span> <span class="arrow">></span><span class="path">(${this.products.length} items)</span>`;
  }

  // Initialize the product listing and fetch the data
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.products = list;
    // render the list
    this.renderList(list);

    // Sort the products/list by price or name
    const sortElement = document.getElementById("sort");
    sortElement.addEventListener("change", (event) => {
      const sortedList = this.sortList(list, event.target.value);
      this.renderList(sortedList);
    });

    //set the title to the current category
    // Capitalize the first letter of the category
    const title =
      this.category.charAt(0).toUpperCase() + this.category.slice(1);
    document.querySelector(".title").innerHTML = title;
    this.handleBrandCrumbs();

    // event listener to trigger the modal
    document.addEventListener("click", function (e) {
      if (e.target && e.target.matches("#quickViewBtn")) {
        const productId = e.target.getAttribute("data-id");
        console.log(productId);

        // Create an instance of ExternalServices
        const dataSource = new ExternalServices();

        const modal = new ProductModal(productId, dataSource);
        modal.init();
      }
    });
  }
}
