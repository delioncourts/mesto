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
    }
  
    _showInputError = (inputElement, errorMessage) => {
      const { errorClass, inputErrorClass } = this._settings;
  
      const errorElement = this._form.querySelector(
        "#" + inputElement.id + "-error"
      );
      inputElement.classList.add(inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(errorClass);
    };
  
    // скрыть ошибку
    _hideInputError = (inputElement) => {
      const { errorClass, inputErrorClass } = this._settings;
  
      const errorElement = this._form.querySelector(
        "#" + inputElement.id + "-error"
      );
      inputElement.classList.remove(inputErrorClass);
      errorElement.errorClass.remove(errorClass);
      errorElement.textContent = "";
    };
  
    _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validity);
      } else {
        this._hideInputError(inputElement);
      }
    };
  
    _hasInvalidInput = () => {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };
  
    _disableSubmitButton = () => {
      const { inactiveButtonClass } = this.settings;
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.disabled = true;
    };
  
    _enableSubmitButton = () => {
      const { inactiveButtonClass } = this.settings;
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.disabled = false;
    };
  
    _toggleButtonState = () => {
      if (this._hasInvalidInput()) {
        this._disableSubmitButton();
      } else {
        this._enableSubmitButton();
      }
    };
  
    _setEventListeners() {
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this.toggleButtonState();
        });
      });
    }
  
    enableValidation() {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
  
      this._setEventListeners();
    }
  }
  
  