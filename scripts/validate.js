//const form = document.querySelector('.form');
//const formInput = form.querySelector('.form__input');
//const formError = form.querySelector(`.${formInput.id}-error`);ё

// отмена стандартного поведения браузера
function submitForm(evt) {
  evt.preverntDefault();
}
//показать сообщение об ошибке
function showInputError(inputElement, errorElement, {inputErrorClass, errorClass}) {
  //const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

//скрыть сообщение об ошибке
function hideInputError(inputElement, errorElement, {inputErrorClass, errorClass}) {
  //const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//проверка кнопки
function toggleButtonState(formElement, {submitButtonSelector, inactiveButtonClass}) {
  const submitButton = formElement.querySelector(submitButtonSelector);
  const checkFormValidity = formElement.checkValidity();
  if (!checkFormValidity) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute("disabled", "");
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute("disabled");
  }
}; 

//проверить валидность элемента
function checkInputValidity(formElement, inputElement, classes) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, classes);
  } else {
    hideInputError(inputElement, errorElement, classes);
  };
  toggleButtonState(formElement, classes);
};

//добавить слушатель
const setEventListeners = (formElement, { inputSelector, ...rest}) => {
  const inputList = formElement.querySelectorAll(inputSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(formElement, rest);
    });
  });
};
// запуск валидации
function enableValidation( {formSelector, inputSelector, ...rest}) {
  const formList = document.querySelectorAll(formSelector); 
  formList.forEach((formElement) => {
  formElement.addEventListener("submit", submitForm);
  const inputList = formElement.querySelectorAll(inputSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, rest);
    });
  });
  toggleButtonState(formElement, rest);
}); 
};

//валидация
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });