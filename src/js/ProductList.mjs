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
        this.renderList(productList);
    }

    renderList(productList) {
        const htmlStrings = productList.map(productCardTemplate);
        this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    }
}