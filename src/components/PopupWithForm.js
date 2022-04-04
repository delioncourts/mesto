import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popupSelector.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._saveButton = this._form.querySelector(".popup__save");
  }

  _getInputValues() {
    this._values = {};

    this._inputs.forEach(input => {
      this._values[input.name] = input.value;
    });

    return this._values;
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._saveButton.textContent = "Сохранение...";
    } else { 
      this._saveButton.textContent = "Сохранить";
  }
}

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}