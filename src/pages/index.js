import {
  initialCards,
  imageCardModal,
  popupOpenPhoto,
  popupOpenSubtitle,
  nameInput,
  jobInput,
  editModal,
  addCardForm,
  profileForm,
  editProfileButton,
  addCardButton,
  inputCardName,
  inputCardLink,
  cardList,
  cardTemplateSelector,
  validationConfig
} from "../scripts/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css"

export function handleCardClick(name, link) {
  popupOpenSubtitle.textContent = this._name;
  popupOpenPhoto.src = this._link;
  popupOpenPhoto.alt = this._name;
}


function createCard(item) {
  const card = new Card(item, cardTemplateSelector, handleCardClick);
  const cardElement = card.getCardElement();
  return cardElement;
}

function renderCard(cardItem) {
  const newCard = createCard(cardItem);
  cardList.prepend(newCard);
}

const editFormValid = new FormValidator(validationConfig, profileForm);
const addCardFormValid = new FormValidator(validationConfig, addCardForm);

editFormValid.enableValidation();
addCardFormValid.enableValidation();

//редактирование профиля
function submitCardHandler() {
  const card = createCard({
    name: data['card-name'],
    link: data.link,
  });
  section.addItem(card);
  addCardPopup.close();
  addCardFormValid.disableSubmitButton();
}


const submitProfileForm = (data) => {
  const { name, job } = data;
  userInfo.setUserInfo(name, job);
  editProfilePopup.close();
};

editProfileButton.addEventListener("click", () => {
  editProfilePopup.open();
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name; 
  jobInput.value = job;
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
  profileDescriptionSelector: ".profile__subtitle"
});