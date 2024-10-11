import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class Modal {
  constructor(title, message, actionButton = false) {
    this.message = message;
    this.actionButton = actionButton;
    this.title = title;
  }

  ShowModal() {
    const shouldShowModal = getLocalStorage("modal-register");
    if(shouldShowModal) return false;

    this.handleModal();
    setLocalStorage("modal-register", true);
  }

  handleModal() {
    const HTML = `
      <div class="modal">
        <div class="modal-content">
          <div class="header">
            <h5>${this.title}</h5>
            <button id="close-modal" type="button">X</button>
          </div>
          <div class="modal-body">
            ${this.message}
          </div>
          <div class="action-button">${this.actionButton ? `<a href="#">Register Now</a>` : ""}</div>
          
        </div>
      </div>
    `;
    document.querySelector("body").insertAdjacentHTML("beforeend", HTML);

    document.querySelector("#close-modal").addEventListener("click", () => {
      const modalElement = document.querySelector(".modal");
      modalElement.remove();
    });
  }
}
