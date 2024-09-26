import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
        <li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img
                    src="${product.Image}"
                    alt="${product.Name}"
                />
                <h3 class="card__brand"> ${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.ListPrice}</p>
            </a>
        </li>
    `;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const productList = await this.dataSource.getData();
        const filteredProducts = this.filterProducts(productList);
        this.renderList(filteredProducts);
    }

    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productList);
    }

    filterProducts(productList) {
        return productList.filter((product, i) => i < 4)
    }
}