import {
  initialCards,
  imageCardModal,
  popupOpenPhoto,
  popupOpenSubtitle,
  nameInput,
  jobInput,
  editModal,
  addCardModal,
  addCardForm,
  profileForm,
  editProfileButton,
  addCardButton,
  inputCardName,
  inputCardLink,
  cardTemplateSelector,
  validationConfig,
  avatarEditOpen,
  avatarModal,
  avatarForm,
  cardGrid,
} from "../scripts/constants.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { FormValidator } from "../components/FormValidator.js";
import { api } from "../components/Api.js";

import "./index.css";
let userId;

// открытие фотокарточки
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

//Запрос данных на сервер
Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    newUserInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    userId = userData._id;
    cards.forEach((data) => {
      const newCard = createNewCard(data);
      initialCardsList.addItem(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Подтверждение удаления карточки
const deleteCardPopup = new PopupWithConfirmation(".popup_type_delete-confirm");

// открытие изображения карточки
const imagePopup = new PopupWithImage(".popup_type_open-card");

function addCard(item) {
  initialCardsList.addItem(item);
}

// добавление карточек на страницу
const initialCardsList = new Section(
  {
    renderer: (item) => {
      renderCard({
        name: item.name,
        link: item.link,
        likes: item.likes,
        _id: item._id,
        userId: userId,
        ownerId: item.owner._id,
      });
    },
  },
  ".cards__grid"
);

function renderCard(item) {
  const cardElement = createCard(item);
  addCard(cardElement);
}

//Создание новой карточки
function createNewCard(data) {
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
      deleteCardPopup.open();
      deleteCardPopup.setSubmitHandler(() => {
        api
          .deleteCard(id)
          .then(() => {
            card.deleteCard();
            deleteCardPopup.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api
          .deleteLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  const cardElement = card.getCardElement();
  return cardElement;
}

//заполнение данных профиля
const newUserInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__subtitle",
  profileAvatarSelector: ".profile__avatar",
});

// попап добавления карточки
const addCardPopup = new PopupWithForm(".popup_type_add-card", {
  handleSubmit: (data) => {
    addCardPopup.renderLoading(true);
    api
    //data.cardtitle
      .addCard(data.name, data.link)
      .then(res => {
        const newCard = createNewCard(res);
        initialCardsList.addItem(newCard);
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardPopup.renderLoading(false);
      });
  },
});

//попап изменения профиля
const editProfilePopup = new PopupWithForm(".popup_type_edit", {
  handleSubmit: (data) => {
    editProfilePopup.renderLoading(true);
    api
      .editProfile(data.name, data.about)
      .then((res) => {
        newUserInfo.setUserInfo(res.name, res.about, res.avatar);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  },
});

//попап изменения аватара
const changeAvatarPopup = new PopupWithForm(".popup_type_avatar", {
  handleSubmit: (picture) => {
    changeAvatarPopup.renderLoading(true);
    const { avatar } = picture;
    api
      .changeAvatar(avatar)
      .then(res => {
        newUserInfo.setUserInfo(res.name, res.about, res.avatar);
        changeAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        changeAvatarPopup.renderLoading(false);
      });
  },
});

editProfileButton.addEventListener("click", () => {
  editProfilePopup.open();
  const { name, about } = newUserInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  editFormValid.resetValidation();
});

addCardButton.addEventListener("click", () => {
  addCardFormValid.disableSubmitButton();
  addCardPopup.open();
  addCardFormValid.resetValidation();
});

avatarEditOpen.addEventListener("click", () => {
  avatarFormValid.disableSubmitButton();
  changeAvatarPopup.open();
  avatarFormValid.resetValidation();
});

//Валидация
const editFormValid = new FormValidator(validationConfig, editModal);
const addCardFormValid = new FormValidator(validationConfig, addCardModal);
const avatarFormValid = new FormValidator(validationConfig, avatarModal);

editFormValid.enableValidation();
addCardFormValid.enableValidation();
avatarFormValid.enableValidation();

// слушатели
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteCardPopup.setEventListeners();
changeAvatarPopup.setEventListeners();

//создание карточек
initialCardsList.renderItems();