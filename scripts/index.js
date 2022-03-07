import { initialCards, imageCardModal, popupOpenPhoto, popupOpenSubtitle } from "./constants.js"
import { FormValidator } from "./FormValidator.js"
import { openPopup, closePopup, closePopupOverlay, closePopupEsc } from "./utils.js"
import { Card } from "./Card.js"

//профиль

const popupType = document.querySelectorAll(".popup")
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const editModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");

//формы
const addCardForm = addCardModal.querySelector(".popup__form_add-card");
const profileForm = editModal.querySelector(".popup__form_edit");

//кнопки
const editProfileButton = document.querySelector(".profile__edit-button");
const closeModalEditButton = editModal.querySelector(".popup__close");

const addCardButton = document.querySelector(".profile__add-button");
const closeAddCardButton = addCardModal.querySelector(".popup__close");

const closeImageCard = imageCardModal.querySelector(".popup__close");

// инпуты
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_card-link");

// ADD CARD
const cardList = document.querySelector(".cards__grid");
const cardTemplateSelector = ".card-template";

// сохранение
const popupCardsContainer = addCardModal.querySelector(".popup__container");
const popupCardsForm = popupCardsContainer.querySelector(".popup__form");
const buttonSave = popupCardsForm.querySelector(".popup__save");

// открытие и закрытие попапов при помощи toggle
//function toggleModal(modal) {modal.classList.toggle("popup_opened")}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const renderCard = (data) => { 
  const card = new Card(data, cardTemplateSelector);
  const cardElement = card.getCardElement();
  document.querySelector(".cards__grid").prepend(cardElement)
}

initialCards.forEach(renderCard);

const editFormValid = new FormValidator(validationConfig, profileForm)
const addCardFormValid = new FormValidator(validationConfig, addCardForm)

editFormValid.enableValidation();
addCardFormValid.enableValidation();

//редактирование профиля
function submitCardHandler(evt) {
  evt.preventDefault();
  renderCard ({
    name: inputCardName.value,
    link: inputCardLink.value
  })
  addCardFormValid.disableSubmitButton();
  addCardForm.reset();
  closePopup(editModal);
}

popupType.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup)
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup)
    }
  })
})

function openProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(editModal);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editModal);
}

profileForm.addEventListener('submit', submitProfileForm);
editProfileButton.addEventListener('click', openProfileForm);
popupCardsForm.addEventListener("submit", submitCardHandler);
addCardButton.addEventListener("click", () => {
  openPopup(addCardModal)
})