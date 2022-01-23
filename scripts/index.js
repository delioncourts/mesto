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
  //const profileTitle= document.querySelector('.popup_type_edit');
  //const profileTitle = document.querySelector('.popup_type_edit');
  //let formElement = document.querySelector('.popup__form');
  //let nameInput = document.querySelector('.popup__input_type_name');
 // let jobInput = document.querySelector('.popup__input_type_job');
  //let profileTitle = document.querySelector('.profile__title');
  //let profileSubtitle = document.querySelector('.profile__subtitle');
  
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

  //Модалки
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');

//формы
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');

  //кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const closeModalEditButton = editModal.querySelector('.popup__close');

const addCardButton = document.querySelector('.profile__add-button');
const closeAddCardButton = addCardModal.querySelector('.popup__close');

// инпуты 
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileDescription = document.querySelector('.popup__input_type_job');

// ADD CARD
const list = document.querySelector('.cards__grid');
const cardTemplate = document.querySelector('.card-template').content;

// открытие и закрытие попапов
function toggleModal(modal) {
    modal.classList.toggle('popup_opened');
}


editProfileButton.addEventListener('click', () => toggleModal(editModal))
closeModalEditButton.addEventListener('click', () => toggleModal(editModal))


addCardButton.addEventListener('click', () => toggleModal(addCardModal))
closeAddCardButton.addEventListener('click', () => toggleModal(addCardModal))


// добавить карточку 
addCardForm.addEventListener('submit', (event) => {
    event.preventDefault();

createCard({
    name: inputCardName.value,
    link: inputCardLink.value
})

toggleModal(addCardModal)
})

editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    

toggleModal(editModal)
})

function createCard(cardData) {
        const cardElement = cardTemplate.cloneNode(true);
        const cardImage = cardElement.querySelector('.card__image');
        const cardTitle = cardElement.querySelector('.card__title');


        cardTitle.textContent = cardData.name;
        cardImage.src = cardData.link;

        list.prepend(cardElement);
    }

    initialCards.forEach(createCard)