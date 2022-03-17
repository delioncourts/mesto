import {
  initialCards,
  imageCardModal,
  popupOpenPhoto,
  popupOpenSubtitle,
} from "../scripts/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

//профиль

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
//const profileTitle = document.querySelector(".profile__title");
//const profileSubtitle = document.querySelector(".profile__subtitle");

const editModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");

//формы
const addCardForm = addCardModal.querySelector(".popup__form_add-card");
const profileForm = editModal.querySelector(".popup__form_edit");

//кнопки
const editProfileButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

// инпуты
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_card-link");

// ADD CARD
const cardList = document.querySelector(".cards__grid");
const cardTemplateSelector = ".card-template";

export function handleCardClick(name, link) {
  popupOpenSubtitle.textContent = this._name;
  popupOpenPhoto.src = this._link;
  popupOpenPhoto.alt = this._name;
  //openPopup(imageCardModal);
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// открытие и закрытие попапов при помощи toggle
//function toggleModal(modal) {modal.classList.toggle("popup_opened")}

function createCard(item) {
  const card = new Card(item, cardTemplateSelector, handleCardClick);
  const cardElement = card.getCardElement();
  return cardElement;
}

function renderCard(cardItem) {
  const newCard = createCard(cardItem);
  cardList.prepend(newCard);
}

//initialCards.forEach(renderCard);

const editFormValid = new FormValidator(validationConfig, profileForm);
const addCardFormValid = new FormValidator(validationConfig, addCardForm);

editFormValid.enableValidation();
addCardFormValid.enableValidation();

//редактирование профиля
function submitCardHandler(evt) {
  const card = createCard({
    name: inputCardName.value,
    link: inputCardLink.value,
  });

  section.addItem(card);
  addCardPopup.close();
  addCardFormValid.disableSubmitButton();
}


const submitProfileForm = (data) => {
  const { name, description } = data;
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
};

//profileForm.addEventListener('submit', submitProfileForm);
//editProfileButton.addEventListener('click', openProfileForm);
//popupCardsForm.addEventListener("submit", submitCardHandler);
//addCardButton.addEventListener("click", () => {
//openPopup(addCardModal)
//})

editProfileButton.addEventListener("click", () => {
  const userInfoValues = userInfo.getUserInfo();
  nameInput.value = userInfoValues.name; 
  jobInput.value = userInfoValues.description;
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__grid"
);



const imagePopup = new PopupWithImage(".popup_type_open-card");

const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  submitCardHandler
);
const editProfilePopup = new PopupWithForm(
  ".popup_type_edit",
  submitProfileForm
);

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
section.renderItems();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__subtitle",
});