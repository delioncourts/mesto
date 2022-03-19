export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError = (inputElement, errorMessage) => {
    const inputErrorClass = this._inputErrorClass;
    const errorClass = this._errorClass;
    const errorElement = this._form.querySelector(
      "#" + inputElement.id + "-error"
    );
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
  };

  // скрыть ошибку
  _hideInputError = (inputElement) => {
    const inputErrorClass = this._inputErrorClass;
    const errorClass = this._errorClass;

    const errorElement = this._form.querySelector(
      "#" + inputElement.id + "-error"
    );
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  disableSubmitButton = () => {
    const inactiveButtonClass = this._inactiveButtonClass;
    this._buttonElement.classList.add(inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableSubmitButton = () => {
    const inactiveButtonClass = this._inactiveButtonClass;
    this._buttonElement.classList.remove(inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    });

  }
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._formElement.addEventListener('reset', () => {
      this._disableButton(buttonElement);
     
      inputList.forEach((inputElement) => {
           this._hideInputError(inputElement)
                 })
      });  
  }

  enableValidation() {
    this.disableSubmitButton();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}

//export const validationConfig = {
  //formSelector: ".popup__form",
  //inputSelector: ".popup__input",
  //submitButtonSelector: ".popup__save",
  //inactiveButtonClass: "popup__save_disabled",
 // inputErrorClass: "popup__input_type_error",
 // errorClass: "popup__error_visible",
//};