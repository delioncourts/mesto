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
const imageCardModal = document.querySelector('.popup_type_open-card');

//формы
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');

  //кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const closeModalEditButton = editModal.querySelector('.popup__close');

const addCardButton = document.querySelector('.profile__add-button');
const closeAddCardButton = addCardModal.querySelector('.popup__close');

const openImageCard = document.querySelector('.popup__container-open');
const closeImageCard = imageCardModal.querySelector('.popup__close');

// инпуты 
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileDescription = document.querySelector('.popup__input_type_job');

// для карточек
const list = document.querySelector('.cards__grid');
const cardTemplate = document.querySelector('.card-template').content;
const popupOpenSubtitle = document.querySelector('.popup__open-photo-subtitle');
const popupOpenPhoto = document.querySelector('.popup__open-photo');

// открытие и закрытие попапов
function toggleModal(modal) {
    modal.classList.toggle('popup_opened');
}

editProfileButton.addEventListener('click', () => toggleModal(editModal));
closeModalEditButton.addEventListener('click', () => toggleModal(editModal));

addCardButton.addEventListener('click', () => toggleModal(addCardModal));
closeAddCardButton.addEventListener('click', () => toggleModal(addCardModal));

openImageCard.addEventListener('click', () => toggleModal(imageCardModal));
closeImageCard.addEventListener('click', () => toggleModal(imageCardModal));

// добавить карточку 
addCardForm.addEventListener('submit', (event) => {
    event.preventDefault();

createCard({
    name: inputCardName.value,
    link: inputCardLink.value
})

toggleModal(addCardModal)
})

// изменить название профиля
editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    
toggleModal(editModal)
})

// удаление карточки
function deleteHandler(e) {
    e.target.closest('.card').remove()
    cardElement.remove();
}

// поставить лайк
function likeHandler(e) {
    e.target.closest('.card__like').classList.toggle('card__like-active');
}

// создать карточку
function createCard(cardData) {
        const cardElement = cardTemplate.cloneNode(true);
        const cardImage = cardElement.querySelector('.card__image');
        const cardTitle = cardElement.querySelector('.card__title');
        const deleteButton = cardElement.querySelector('.card__delete');
        const likeButton = cardElement.querySelector('.card__like');

        cardTitle.textContent = cardData.name;
        cardImage.src = cardData.link;
        cardImage.alt = cardTitle.textContent;

        deleteButton.addEventListener('click', deleteHandler);

        likeButton.addEventListener('click', likeHandler);

        cardImage.addEventListener('click', function() {
            popupOpenSubtitle.textContent = cardData.name;
            popupOpenPhoto.src = cardData.link;
            popupOpenPhoto.alt = popupOpenSubtitle.textContent;

            toggleModal(imageCardModal)
        })

        list.prepend(cardElement);
    }

    //добавить карточки из массива
    initialCards.forEach(createCard)