import { openPopup } from "./utils.js";
import { imageCardModal, popupOpenPhoto, popupOpenSubtitle } from "./constants.js"

export class Card {
    constructor(data, cardTemplateSelector) {
        //this._data = data; 
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(cardTemplateSelector).content;

    }

    _addLike = () => {
        this._likeButton.target.closest(".card__like").classList.toggle("card__like-active");
      }
      

      _deleteCard = () => {
        this._cardElement.remove();
      }

      _previewPicture = () => {
        popupOpenSubtitle.textContent = this._name;
        popupOpenPhoto.src = this._link;
        popupOpenPhoto.alt = this._name;
        openPopup(imageCardModal);
      }


      _setEventListeners = () => {
        this._deleteButton.addEventListener("click", this._deleteCard);
        this._likeButton.addEventListener("click", this._addLike);
        this._cardImage.addEventListener("click", this._previewPicture);
      }

      _fillCard = () => {
        this._cardElement.querySelector(".card__title").textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
      }
      
    getCardElement = () => {
        this._cardElement = this._template.cloneNode(true);

        this._cardImage = this._cardElement.querySelector(".card__image");
        this._deleteButton = this._cardElement.querySelector(".card__delete");
        this._likeButton = this._cardElement.querySelector(".card__like");
      
        //заполнение 
        this._fillCard();
    
      //подписки 
      this._setEventListeners();

        return this._cardElement;
      }
}
