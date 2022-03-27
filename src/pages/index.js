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
  validationConfig,
  avatarProfile,
} from "../scripts/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

import "./index.css";

let userId;

//Запрос данных на сервер

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cardList]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    userId = userData._id;
    cardList.forEach((data) => {
      const newCard = createCard(data);
      cardList.addItem(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

api.getProfile()
.then((res) => {
  userInfo.setUserInfo(res.name, res.about);
  userID = res._id;
})
.catch((err) => {
  console.log(err);
});

api.getInitialCards().then((cardList) => {
  console.log("cardList", cardList);
  cardList.forEach((data) => {
    const card = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id,
    });
    section.addItem(card);
  });
});

// Редактирование профиля
const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__subtitle",
  profileAvatarSelector: ".profile__avatar",
});

//Открытие попапа с каринкой
function handleCardClick(name, link) {
  imagePopup(name, link)
}

// Создание новой карточки
function createCard(data) {
  const card = new Card(
  {
    name: data.name,
    link: data.link,
    likes: data.likes,
    _id: data._id,
    userId: userId,
    ownerId: data.owner._id,
  },
   cardTemplateSelector, 
   handleCardClick, 
   (id) => {
    confirmPopup.open(),
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
        .then(() => {
          card.deleteCard();
          addCardPopup.close();
        })
        .catch((res) => {
          console.log(res)
        })
      }),
      (id) => {
        if (card.isLiked()) {
          api.deleteLike(id).then((res) => {
            card.setLikes(res.likes);
          });
        } else {
          api.addLike(id).then((res) => {
            card.setLikes(res.likes);
          });
        }
      };
  });
  const cardElement = card.getCardElement();
  return cardElement;
}

function renderCard(cardItem) {
  const newCard = createCard(cardItem);
  cardList.prepend(newCard);
}

// валидация 
const editFormValid = new FormValidator(validationConfig, profileForm);
const addCardFormValid = new FormValidator(validationConfig, addCardForm);

editFormValid.enableValidation();
addCardFormValid.enableValidation();

//редактирование профиля
function submitCardHandler(data) {
  api.addCard(data["card-name"], data.link).then((res) => {
    const card = createCard({
      name: data["card-name"],
      link: data.link,
      likes: data.likes,
      _id: data._id,
      userId: userId,
      ownerId: data.owner._id,
    });
    section.addItem(card);
    addCardPopup.close();
    addCardFormValid.disableSubmitButton();
  });
}

// редактирование аватарки 
function submitAvatarForm(data) {
  api.changeAvatar(data.link)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar)
      editAvatarPopup.close()
    })
    .catch(console.log)
    .finally(() => {
      editAvatarPopup.removeSaveButton()
    })
};

// Редактирование информации о профиле 
function submitProfileForm(data) {
  const { name, job } = data;

  api.editProfile(name, job).then(() => {
    userInfo.setUserInfo(name, job);
  });

  editProfilePopup.close();
}

editProfileButton.addEventListener("click", () => {
  editProfilePopup.open();
  const userInformation = userInfo.getUserInfo();
  nameInput.value = userInformation.name;
  jobInput.value = userInformation.job;
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

const confirmPopup = new PopupWithConfirmation(".popup_type_delete-confirm");

const editAvatarPopup = new PopupWithForm(
  ".popup_type_avatar",
  submitAvatarForm
);


imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();
editAvatarPopup.setEventListeners();

section.renderItems();