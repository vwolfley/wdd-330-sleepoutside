import { getLocalStorage, setLocalStorage, cartSuperscript } from "./utils.mjs";

function cartItemTemplate(item) {
  return `
        <li class="cart-card divider">
            <a href="#" class="cart-card__image">
                <img
                src="${item.Images.PrimarySmall}"
                alt="${item.Name}"
                />
            </a>
            <a href="#">
                <h2 class="card__name">${item.Name}</h2>
            </a>
            <p class="cart-card__color">${item.Colors[0].ColorName}</p>
            <div class="qtd-container">
                <div class="qtd-button" id="qtdUp" data-id="${item.Id}">+</div>
                <p class="cart-card__quantity">qty: ${item.Qtd}</p>
                <div class="qtd-button" id="qtdDown" data-id="${item.Id}">-</div>
            </div>
            <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
            <button class="cart-card__remove" data-id="${item.Id}">X</button>
        </li>
    `;
}

export default class ShoppingCart {
  constructor() {}

  // Renders the shopping cart contents
  renderCartContents() {
    // Get cart contents from localStorage if any
    const cartItems = getLocalStorage("so-cart") || [];

    // If there are no items, we can stop here or show a message
    if (cartItems.length === 0) {
      document.querySelector(".product-list").innerHTML =
        "<p>Your cart is empty.</p>";
      this.cartSubtotal(cartItems);
      return;
    }
    // If there are items, we can render them
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Set the total price of the cart
    this.cartSubtotal(cartItems);

    // Create events listeners for removing items from the card
    const removeButtons = document.querySelectorAll(".cart-card__remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => this.removeCartItem(event));
    });

    // Create event listeners for qtd down button
    const qtdDownButton = document.querySelectorAll("#qtdDown");
    qtdDownButton.forEach((button) => {
      button.addEventListener("click", (event) => this.decreaseQtdBy1(event));
    });

    // Create event listeners for qtd up button
    const qtdUpButton = document.querySelectorAll("#qtdUp");
    qtdUpButton.forEach((button) => {
      button.addEventListener("click", (event) => this.increaseQtdBy1(event));
    });
  }

  // Decreases qtd by 1
  decreaseQtdBy1(event) {
    const itemId = event.target.getAttribute("data-id");
    const cartItems = getLocalStorage("so-cart");

    // Get index of item with matching id
    const itemIndex = cartItems.findIndex((item) => item.Id === itemId);

    // Check if qtd is 1, remove item from cart if so
    if (cartItems[itemIndex].Qtd === 1) {
      this.removeCartItem(event);
    } else {
      // Decrease item qtd by 1
      cartItems[itemIndex].Qtd -= 1;
      cartItems[itemIndex].FinalPrice -= cartItems[itemIndex].ListPrice;

      // Update cart in localStorage with new qtd
      setLocalStorage("so-cart", cartItems);

      // Rerender cart items
      this.renderCartContents();
    }
  }

  // Increases qtd by 1
  increaseQtdBy1(event) {
    const itemId = event.target.getAttribute("data-id");
    const cartItems = getLocalStorage("so-cart");

    // Get index of item with matching id
    const itemIndex = cartItems.findIndex((item) => item.Id === itemId);

    // Increase item qtd by 1
    cartItems[itemIndex].Qtd += 1;
    cartItems[itemIndex].FinalPrice += cartItems[itemIndex].ListPrice;

    // Update cart in localStorage with new qtd
    setLocalStorage("so-cart", cartItems);

    // Rerender cart items
    this.renderCartContents();
  }

  // Removes an item from the cart
  removeCartItem(event) {
    const itemId = event.target.getAttribute("data-id");
    const cartItems = getLocalStorage("so-cart");

    const cartItemRemoved = cartItems.filter((item) => item.Id !== itemId);
    setLocalStorage("so-cart", cartItemRemoved);

    // Load cartSuperscript
    cartSuperscript();

    // Rerender shopping cart
    this.renderCartContents();
  }

  // Calculates the cart subtotal
  cartSubtotal(items) {
    // console.log(items);
    const cartCard = document.querySelector(".cart-card__subtotal");
    if (items.length <= 0) {
      cartCard.classList.add("hide"); // Hide the cart subtotal
    } else {
      cartCard.classList.remove("hide"); // Show the cart subtotal

      const subtotal = items.reduce((acc, item) => acc + item.FinalPrice, 0);

      const cartCount = items.reduce((acc, item) => acc + item.Qtd, 0);
      // cart count
      if (cartCount > 1) {
        document.querySelector(".cart-count").textContent =
          `${cartCount} items`;
      } else {
        document.querySelector(".cart-count").textContent = `${cartCount} item`;
      }

      // cart subtotal
      document.querySelector(".cart-subtotal").textContent =
        ` $${subtotal.toFixed(2)}`;
    }
  }
}
