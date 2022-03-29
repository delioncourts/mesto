export class Card {
  constructor(
    data,
    cardTemplateSelector,
    { handleCardClick },
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;

    this._cardTemplateSelector = cardTemplateSelector;
    this._cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector('.card')
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  // постановка и удаление лайков
  isLiked() {
    const userHasLikedCard = this._like.find(
      (user) => user._id === this._userId
    );
    return userHasLikedCard;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCountElement.textContent = newLikes.length
    if (this.isLiked()) {
      this._addLike();
    } else {
      this._removeLike();
    }
  }

  // заполнение карточки

  _fillCard = () => {
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  };

  getCardElement() {
    this._cardElement = this._cardTemplate.cloneNode('true')

    this._likeCountElement = this._cardElement.querySelector(".card__like-count");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._deleteButton = this._cardElement.querySelector(".card__delete");
    this._likeButton = this._cardElement.querySelector(".card__like");

    //заполнение
    this._fillCard();

    //подписки
    this._setEventListeners();

    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = "none";
    }

    return this._cardElement;
  }

  // постановка и удаление лайков

  _addLike() {
    this._likeButton.classList.add("card__like-active");
  };

  _removeLike() {
    this._likeButton.classList.remove("card__like-active");
  };

  // удаление карточки

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  };

  // слушатели

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => this._handleCardClick());
    this._deleteButton = ("click", () => this._handleDeleteClick(this._id));
    this._likeButton = ("click", () => this._handleLikeClick(this._id));
  }
}