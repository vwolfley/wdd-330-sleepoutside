import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
  cartSuperscript
} from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  
  // Show quantaty of cart item
  cartSuperscript(cartItems);

  // If there are no items, we can stop here or show a message
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    cartSubtotal(cartItems);
    return;
  }
  // If there are items, we can render them
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Set the total price of the cart
  cartSubtotal(cartItems);

  // console.log(cartItems);
  addRemoveButtonEventListeners();
}

function addRemoveButtonEventListeners() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });
}

function removeCartItem(event) {
  const cartItems = getLocalStorage("so-cart") || [];
  const itemId = event.target.getAttribute("data-id");

  const cartItemRemoved = cartItems.filter((item) => item.Id !== itemId);
  setLocalStorage("so-cart", cartItemRemoved);

  renderCartContents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
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
</li>`;

  return newItem;
}

function cartSubtotal(items) {
  const cartCard = document.querySelector(".cart-card__subtotal");
  // console.log(items);
  if (items.length <= 0) {
    cartCard.classList.add("hide"); // Hide the cart subtotal
  } else {
    cartCard.classList.remove("hide"); // Show the cart subtotal

    const subtotal = items.reduce((acc, item) => acc + item.FinalPrice, 0);
    const cartCount = items.reduce((acc, item) => acc + item.Qtd, 0);
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



async function init()
{
  await loadHeaderFooter();
  renderCartContents();
}

init();