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
  avatarEditOpen,
  avatarModal, 
  avatarForm,
  profileInfo
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

// Редактирование профиля
const user = new UserInfo(profileInfo)

//Запрос данных на сервер

Promise.all([api.getInitialCards(), api.getProfile()])
  .then(([cards, userData]) => {
    userId = userData._id
    user.setUserInfo(userData.name, userData.about)
    user.setUserAvatar(userData.avatar)
    cards.reverse()
    sectionPhoto.renderItems(cards)
  })
  .catch(err => {
    console.log(err)
  })



// открытие изображения карточки
const imagePopup = new PopupWithImage(".popup_type_open-card");

// // создание новой карточки

api.getProfile()
.then((res) => {
  user.setUserInfo(res.name, res.about);
  userId = res._id;
})
.catch((err) => {
  console.log(err);
});

// ///
api.getInitialCards().then((cardList) => {
  console.log("cardList", cardList);
  cardList.forEach((data) => {
    const card = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      _id: data._id,
      userId: data.userId,
      ownerId: data.owner._id,
    });
    sectionPhoto.addItem(card);
  });
});


// //Открытие попапа с каринкой
function handleCardClick(name, link) {
  imagePopup.open(name, link)
}

//Создание новой карточки
function createCard(data) {
  const card = new Card(
  {
    name: data.name,
    link: data.link,
    likes: data.likes,
   _id: data._id,
    userId: data.userId,
   ownerId: data.owner._id,
  },
   cardTemplateSelector, 
   handleCardClick, 
   (id) => {
    confirmPopup.open(),
      confirmPopup.handleSubmit(() => {
        api.deleteCard(id)
        .then(() => {
          card.deleteCard();
          confirmPopup.close();
        })
        .catch(res => {
          console.log(res)
        })
      }),

      (id) => {
        if (card.isLiked()) {
          api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          api.addLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
        }
      };
  });

  const cardElement = card.getCardElement();
  return cardElement;
}

///
function renderCard(cardItem) {
  const newCard = createCard(cardItem);
  cardList.prepend(newCard);
}

// валидация 
const editFormValid = new FormValidator(validationConfig, profileForm);
const addCardFormValid = new FormValidator(validationConfig, addCardForm);
const avatarFormValid = new FormValidator(validationConfig, avatarForm);

editFormValid.enableValidation();
addCardFormValid.enableValidation();
avatarFormValid.enableValidation();


//редактирование профиля
function submitCardHandler(data) {
  api.addCard(data["card-name"], data.link).then((res) => {
    const card = createCard({
      name: data["card-name"],
      link: data.link,
      likes: data.likes,
      _id: data.id,
      userId: data.userId,
      ownerId: data.owner._id,
    });
    sectionPhoto.addItem(card);
    addCardPopup.close();
    addCardFormValid.disableSubmitButton();
  });
}

// Редактирование информации о профиле 
function submitProfileForm(data) {
  const { name, job } = data;

  api.editProfile(name, job).then(() => {
    user.setUserInfo(name, job);
  });

  editProfilePopup.close();
}


const sectionPhoto = new Section( {
  items: [], //initialCards, 
  renderer: (cardItem) => {
    const newCard = createCard(cardItem);
    cardList.addItem(newCard);
  }
}, ".cards__grid")


  //function renderCard(cardItem) {
   // const newCard = createCard(cardItem);
   // cardList.prepend(newCard);
  //}


const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  submitCardHandler
);
const editProfilePopup = new PopupWithForm(
  ".popup_type_edit",
  submitProfileForm
);

const confirmPopup = new PopupWithConfirmation(".popup_type_delete-confirm");


// редактирование аватарки
const editAvatarPopup = new PopupWithForm(".popup_type_avatar", {
  handleSubmit: (res) => {
    editAvatarPopup.renderLoading(true)
      api.setUserAvatar(res.avatar)
          .then(res => {
              user.setUserAvatar(res.avatar)
              editAvatarPopup.close()
          })

      .finally(() => { editAvatarPopup.renderLoading(false) })
      .catch(err => {
        console.log(err)
      })
  }

})

// слушатели
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();
editAvatarPopup.setEventListeners();

editProfileButton.addEventListener("click", () => {
  editProfilePopup.open();
  const userInformation = user.getUserInfo();
  nameInput.value = userInformation.name;
  jobInput.value = userInformation.job;
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

avatarEditOpen.addEventListener("click", () => {
  avatarFormValid.disableSubmitButton()
  avatarForm.open();
});


//создание карточек
sectionPhoto.renderItems();