import { getLocalStorage, setLocalStorage } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  addRemoveButtonEventListeners();
}

function addRemoveButtonEventListeners() {
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", removeCartItem);
  })
}

function removeCartItem(event) {
  const itemId = event.target.getAttribute("data-id");
  const cartItems = getLocalStorage("so-cart");

  const cartItemRemoved = cartItems.filter(item => item.Id !== itemId);
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

renderCartContents();
