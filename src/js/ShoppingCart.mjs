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
            <p class="cart-card__quantity">qty: 1</p>
            <p class="cart-card__price">$${item.FinalPrice}</p>
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

        // console.log(cartItems);
        this.addRemoveButtonEventListeners();
    }

    // Adds event listeners to the remove button
    addRemoveButtonEventListeners() {
        const removeButtons = document.querySelectorAll(".cart-card__remove");
        removeButtons.forEach((button) => {
            button.addEventListener("click", (event) => this.removeCartItem(event));
        });
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
        this.renderCartContents()
    }

    // Calculates the cart subtotal
    cartSubtotal(items) {
        const cartCard = document.querySelector(".cart-card__subtotal");
        if (items.length <= 0) {
            cartCard.classList.add("hide"); // Hide the cart subtotal
        } else {
            cartCard.classList.remove("hide"); // Show the cart subtotal

            const subtotal = items.reduce((acc, item) => acc + item.FinalPrice, 0);
            // console.log({ items, subtotal });
            const cartCount = items.length;
            // cart count
            if (cartCount > 1) {
            document.querySelector(".cart-count").textContent = `${cartCount} items`;
            } else {
            document.querySelector(".cart-count").textContent = `${cartCount} item`;
            }

            // cart subtotal
            document.querySelector(".cart-subtotal").textContent = ` $${subtotal}`;
        }
    }
}