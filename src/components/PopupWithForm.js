import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handlerSubmit }) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
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

  changeSubmitHandler(newhandlerFormSubmit){
    this._handlerSubmit = newhandlerFormSubmit
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
      this._handlerSubmit(this._getInputValues());
    });
  }
}