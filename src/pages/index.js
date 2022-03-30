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
  cardList,
  cardTemplateSelector,
  validationConfig,
  avatarEditOpen,
  avatarModal,
  avatarForm,
  profileInfo,
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

//Валидация
const editFormValid = new FormValidator(validationConfig, profileForm);
const addCardFormValid = new FormValidator(validationConfig, addCardForm);
const avatarFormValid = new FormValidator(validationConfig, avatarForm);

editFormValid.enableValidation();
addCardFormValid.enableValidation();
avatarFormValid.enableValidation();

let userId;

// Редактирование профиля
const newUserInfo = new UserInfo(profileInfo);
const deleteCardPopup = new PopupWithConfirmation(".popup_type_delete-confirm");
// открытие изображения карточки
const imagePopup = new PopupWithImage(".popup_type_open-card");

//Создание новой карточки
function createCard(item) {
  const card = new Card(
    {
      data: item,

      handleCardClick: (name, link) => {
        imagePopup.open(name, link);
      },

      handleDeleteClick: (id) => {
        deleteCardPopup.open();
        deleteCardPopup.changeHandleSubmit(() => {
          deleteCardPopup.renderLoading(true);
          api
            .deleteCard(id)
            .then(() => {
              card.deleteCard();
              deleteCardPopup.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              deleteCardPopup.renderLoading(false, "Yes");
            });
        });
      },

      handleLikeClick: (id) => {
        if (card.isLiked()) {
          api
            .removeLike(id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .likeCard(id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    cardTemplateSelector
  );

  const cardElement = card.getCardElement();
  return cardElement;
}

// создание секции
//const sectionPhoto = new Section(
 // {
 ///  renderer: (res) => {
  //    sectionPhoto.addItem(
  //      createCard({
  //        name: res.name,
  //        link: res.link,
  //        likes: res.likes,
   //       id: res._id,
  //        ownerId: res.owner._id,
   //       userId: userId,
   //     })
   //   );
  //  },
 // },
 //// cardGrid
//);

const cardsList = new Section({
  items: [],
  renderer: (data) => {
      createCard(data, '.card-template', cardsList)
    }
  },
  '.elements');
//Запрос данных на сервер

Promise.all([api.getInitialCards(), api.getProfile()])
  .then(([res, userData]) => {
    newUserInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    userId = userData._id;
    res.reverse();
    res.forEach(data => {
      createCard(data, undefined, cardsList);
    })
  })
  .catch((err) => {
    console.log(err);
  });

//форма
const addCardPopup = new PopupWithForm(
  {
    handleSubmit: (data) => {
      addCardPopup.renderLoading(true);
      api
        .addCard(data.name, data.link)
        .then((res) => {
          sectionPhoto.addItem(
            createCard({
              name: res.name,
              link: res.link,
              likes: res.likes,
              id: res._id,
              ownerId: res.owner._id,
              userId: userId,
            })
          );
          addCardPopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          addCardPopup.renderLoading(false, "Create");
        });
    },
  },
  addCardModal
);

//форма
const editProfilePopup = new PopupWithForm(
  {
    handleSubmit: (data) => {
      editProfilePopup.renderLoading(true);
      api
        .editProfile(data.name, data.about)
        .then(() => {
          newUserInfo.setUserInfo(data.name, data.about);
          editProfilePopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          editProfilePopup.renderLoading(false, "Save");
        });
    },
  },
  editModal
);

//форма
const changeAvatarPopup = new PopupWithForm(
  {
    handleSubmit: (data) => {
      changeAvatarPopup.renderLoading(true);
      api
        .changeAvatar(data.link)
        .then(() => {
          newUserInfo.setUserAvatar(data.link);
          changeAvatarPopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          changeAvatarPopup.renderLoading(false, "Save");
        });
    },
  },
  avatarModal
);

// слушатели
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteCardPopup.setEventListeners();
changeAvatarPopup.setEventListeners();

editProfileButton.addEventListener("click", () => {
  editProfilePopup.open();
  const userInformation = newUserInfo.getUserInfo();
  nameInput.value = userInformation.name;
  jobInput.value = userInformation.job;
  editFormValid.resetValidation();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addCardFormValid.resetValidation();
});

avatarEditOpen.addEventListener("click", () => {
  avatarFormValid.disableSubmitButton();
  avatarForm.open();
  avatarFormValid.resetValidation();
});

//создание карточек
// sectionPhoto.renderItems();