const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`)
    const data = await convertToJson(response)
    return data
  }
  async findProductById(id) {
    const products = await this.getData();
    console.log(products);
    return products.find((item) => item.Id === id);
  }
}
