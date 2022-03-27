import handleCardClick from "../pages/index.js";

export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;

    this._template = document.querySelector(cardTemplateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }


  isLiked() {
    const userHasLikedCard = this._likes.find(user => {
      user._id === this._userId
    })

    return userHasLikedCard 
  }

  _addLike = () => {
    this._likeButton.classList.toggle("card__like-active");
  };

  deleteCard() {
    this._cardElement.remove()
    this._cardElement = null
  }

  _setEventListeners = () => {
    this._deleteButton.addEventListener("click", this._handleDeleteClick(this._id));
    this._likeButton.addEventListener("click", this._handleLikeClick());
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  _fillCard = () => {
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  };

  setLikes(newLikes) {
    this._likes = newLikes
    const countLikeElement = this._cardElement.querySelector('.card__like-count')
    countLikeElement.textContent = this._likes.length

    if(this.isLiked) {
      this._addLike
    }
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

    this.setLikes(this._likes);

    if(this._ownerId !== this.userId) {
      this._cardElement.querySelector(".card__delete").style.display = "none"
    }

    const userHasLikedCard = this._likes.find(user => {
      user._id === this._userId
    })
    if(userHasLikedCard) {
      this._addLike
    }

    return this._cardElement;
  };
}