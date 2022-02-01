//профиль

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const editModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");
const imageCardModal = document.querySelector(".popup_type_open-card");

//формы
const addCardForm = addCardModal.querySelector(".popup__form");
const profileForm = editModal.querySelector(".popup__form")

//кнопки
const editProfileButton = document.querySelector(".profile__edit-button");
const closeModalEditButton = editModal.querySelector(".popup__close");

const addCardButton = document.querySelector(".profile__add-button");
const closeAddCardButton = addCardModal.querySelector(".popup__close");

const openImageCard = document.querySelector(".popup__container-open");
const closeImageCard = imageCardModal.querySelector(".popup__close");

// инпуты
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_card-link");

// ADD CARD
const cardList = document.querySelector(".cards__grid");
const cardTemplate = document.querySelector(".card-template").content;

// открытая карточка
const popupOpenPhoto = document.querySelector(".popup__open-photo");
const popupOpenSubtitle = document.querySelector(".popup__open-photo-subtitle");

//попап
const popup = document.querySelector(".popup");

// открытие и закрытие попапов при помощи toggle
//function toggleModal(modal) {modal.classList.toggle("popup_opened")}

//открытие попапа 
function openPopup(popup) {
popup.classList.add("popup_opened");
document.addEventListener("mousedown", closePopupOverlay); 
document.addEventListener("keydown", closePopupEsc);
}

//закрытие попапа
function closePopup(popup){
  popup.classList.remove("popup_opened");
  document.removeEventListener("mousedown", closePopupOverlay); 
  document.removeEventListener("keydown", closePopupEsc);
}

//закрытие по оверлею
function closePopupOverlay(evt) {
  if (evt.target.classList.contains("popup")){
    closePopup(document.querySelector(".popup_opened"))
  }
};

//закрытие по Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape")
  closePopup(document.querySelector(".popup_opened"))
};

// профиль
editProfileButton.addEventListener("click", () => {
  openPopup(editModal);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

// добавить карточку
addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = createCard({
    name: inputCardName.value,
    link: inputCardLink.value,
  });
  renderCard(card); 
  addCardForm.reset();
  closePopup(addCardModal);
  //inputCardName.value = "";
  //inputCardLink.value = "";
});

//редактирование профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editModal);
}

profileForm.addEventListener('submit', submitProfileForm);

// удалить карточку
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// поставить лайк
function addLike(evt) {
  evt.target.closest(".card__like").classList.toggle("card__like-active");
}

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete");
  const likeButton = cardElement.querySelector(".card__like");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardTitle.textContent;

  deleteButton.addEventListener("click", deleteCard);

  likeButton.addEventListener("click", addLike);

  cardImage.addEventListener("click", function () {
    openPopup(imageCardModal);
    popupOpenSubtitle.textContent = cardData.name;
    popupOpenPhoto.src = cardData.link;
    popupOpenPhoto.alt = popupOpenSubtitle.textContent;
  });

  return cardElement;
}

function renderCard(card) { 
  cardList.prepend(card); 
}

initialCards.forEach(item => {
  const card = createCard(item);
  renderCard(card);
});

// события
closeModalEditButton.addEventListener("click", () => closePopup(editModal));

addCardButton.addEventListener("click", () => openPopup(addCardModal));
closeAddCardButton.addEventListener("click", () => closePopup(addCardModal));

closeImageCard.addEventListener("click", () => closePopup(imageCardModal));
