const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  //Профиль 

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

  //Модалки
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');

//формы
const addCardForm = addCardModal.querySelector('.popup__form');
const formElement = document.querySelector('.popup__form');

  //кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const closeModalEditButton = editModal.querySelector('.popup__close');

const addCardButton = document.querySelector('.profile__add-button');
const closeAddCardButton = addCardModal.querySelector('.popup__close');

const imageCardModal = document.querySelector('.popup_type_open-card');
const openImageCard = document.querySelector('.popup__container-open');
const closeImageCard = imageCardModal.querySelector('.popup__close');

// инпуты 
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

// ADD CARD
const cardList = document.querySelector('.cards__grid');
const cardTemplate = document.querySelector('.card-template').content;
const popup = document.querySelector('.popup');

// открытая карточка
const popupOpenPhoto = document.querySelector('.popup__open-photo');
const popupOpenSubtitle = document.querySelector('.popup__open-photo-subtitle');

// открытие и закрытие попапов
function toggleModal(modal) {
    modal.classList.toggle('popup_opened');
}

// профиль 
editProfileButton.addEventListener('click', () =>{
  nameInput.value=profileTitle.textContent;
  jobInput.value=profileSubtitle.textContent; 
  toggleModal(editModal)
})

closeModalEditButton.addEventListener('click', () => toggleModal(editModal))

addCardButton.addEventListener('click', () => toggleModal(addCardModal))
closeAddCardButton.addEventListener('click', () => toggleModal(addCardModal))

openImageCard.addEventListener('click', () => toggleModal(imageCardModal))
closeImageCard.addEventListener('click', () => toggleModal(imageCardModal))

// Функции закрытия и открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() { 
  popup.classList.remove('popup_opened');
}

// добавить карточку 
addCardForm.addEventListener('submit', (event) => {
    event.preventDefault();

createCard({
    name: inputCardName.value,
    link: inputCardLink.value
})
addCardForm.reset();
toggleModal(addCardModal)
})

//редактирование профиля
function formSubmitHandler(evt) { 
  evt.preventDefault();
  profileTitle.textContent=nameInput.value;
  profileSubtitle.textContent=jobInput.value; 
  toggleModal(editModal)
}

formElement.addEventListener('submit', formSubmitHandler); 

function deleteCard(e) {
  e.target.closest('.card').remove();
}

function addLike(e) {
  e.target.closest('.card__like').classList.toggle('card__like-active');
}

function createCard(cardData) {
        const cardElement = cardTemplate.cloneNode(true);
        const cardImage = cardElement.querySelector('.card__image');
        const cardTitle = cardElement.querySelector('.card__title');
        const deleteButton = cardElement.querySelector('.card__delete');
        const likeButton = cardElement.querySelector('.card__like');

        cardTitle.textContent = cardData.name;
        cardImage.src = cardData.link;
        cardImage.alt = cardTitle.textContent;

        deleteButton.addEventListener('click', deleteCard);

        likeButton.addEventListener('click', addLike);

        cardImage.addEventListener('click', function() {
          popupOpenSubtitle.textContent = cardData.name;
          popupOpenPhoto.src = cardData.link;
          popupOpenPhoto.alt = popupOpenSubtitle.textContent;
          toggleModal(popupOpenPhoto)
        });

        cardList.prepend(cardElement); 
      }
      
    

    function createNewCard(cardData) {
      const card = createCard(cardData);
      cardList.prepend(card);
      };

      initialCards.forEach(createCard);