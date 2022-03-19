import { handleCardClick } from "../pages/index.js";

export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(cardTemplateSelector).content;
    this._handleCardClick = handleCardClick;
  }

  _addLike = () => {
    this._likeButton.classList.toggle("card__like-active");
  };

  _handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  _setEventListeners = () => {
    this._deleteButton.addEventListener("click", this._handleDeleteCard);
    this._likeButton.addEventListener("click", this._addLike);
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  _fillCard = () => {
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  };

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
  };
}