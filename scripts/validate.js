// показать ошибку
function showInputError(inputElement, form) {
  const errorElement = document.querySelector("#" + inputElement.id + "-error");
  const errorMessage = inputElement.validationMessage;
  errorElement.textContent = errorMessage;
  inputElement.classList.add(form.inputErrorClass);
}

// скрыть ошибку
function hideInputError(inputElement, form) {
  const errorElement = document.querySelector("#" + inputElement.id + "-error");
  errorElement.textContent = "";
  inputElement.classList.remove(form.inputErrorClass);
}

// меняет состояние кнопки
function toggleButtonState(button, inputElements, form) {
  const formValid = inputElements.every((inputElement) => {
      return inputElement.validity.valid;
  });
  if (formValid) {
      button.classList.remove(form.inactiveButtonClass);
      button.removeAttribute("disabled");
  } else {
      button.classList.add(form.inactiveButtonClass);
      button.setAttribute("disabled", "");
  }
}

// проверить валидность
function checkInputValidity(inputElement, form) {
  if (!inputElement.validity.valid) {
      showInputError(inputElement, form);
  } else {
      hideInputError(inputElement, form);
  }
}

// валидация формы
function enableValidation(form) {
  const formList = [...document.querySelectorAll(form.formSelector)];

  formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
      });

      const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
      const button = formElement.querySelector(form.submitButtonSelector);

      inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
              checkInputValidity(inputElement, form);
              toggleButtonState(button, inputList, form);
          });
      });

      toggleButtonState(button, inputList, form);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});