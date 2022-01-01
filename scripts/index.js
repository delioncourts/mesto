const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector ('.popup');

function openPopup () {
    popup.classList.add('popup_opened');
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);