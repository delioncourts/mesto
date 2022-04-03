export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;

    this._inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }

  //покзаать ошибку
  _showError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = errorMessage;
  };

  //скрыть ошибку
  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement, inputElement.validationMessage);
    }
  };

  _isFormValid = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableSubmitButton = () => {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggletButtonState = () => {
    if (this._isFormValid()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggletButtonState();
      });
    });
  };

  resetValidation() {
    this._toggletButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    })
  }

  enableValidation() {
    this.disableSubmitButton();
    this._setEventListeners();
  }
}