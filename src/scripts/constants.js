// массив с карточками 

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];
  
export const imageCardModal = document.querySelector(".popup_type_open-card");
export const popupOpenPhoto = document.querySelector(".popup__open-photo");
export const popupOpenSubtitle = document.querySelector(
    ".popup__open-photo-subtitle"
  );

  //профиль

export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_job");


export const editModal = document.querySelector(".popup_type_edit");
export const addCardModal = document.querySelector(".popup_type_add-card");

//формы
export const addCardForm = addCardModal.querySelector(".popup__form_add-card");
export const profileForm = editModal.querySelector(".popup__form_edit");

//кнопки
export const editProfileButton = document.querySelector(".profile__edit-button");

export const addCardButton = document.querySelector(".profile__add-button");

// инпуты
export const inputCardName = document.querySelector(".popup__input_type_card-name");
export const inputCardLink = document.querySelector(".popup__input_type_card-link");

export const cardList = document.querySelector(".cards__grid");
export const cardTemplateSelector = ".card-template";