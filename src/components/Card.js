export class Card {
  constructor(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;

    this._template = document
      .querySelector(cardTemplateSelector)
      .content.querySelector(".card");
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  // постановка и удаление лайков

  _addLike = () => {
    this._likeButton.classList.add("card__like-active");
  };

  _removeLike = () => {
    this._likeButton.classList.remove("card__like-active");
  };

  isLiked() {
    const userHasLikedCard = this._likes.find((user) => {
      user._id === this._userId;
    });
    return userHasLikedCard;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement =
      this._cardElement.querySelector(".card__like-count");
    likeCountElement.textContent = this._likes.length;
    if (this.isLiked()) {
      this._addLike();
    } else {
      this._removeLike();
    }
  }

  // удаление карточки

  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  // слушатели

  _setEventListeners = () => {
    this._deleteButton.addEventListener(
      "click",
      this._handleDeleteClick(this._id)
    );
    this._likeButton.addEventListener("click", this._handleLikeClick(this._id));
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  // заполнение карточки

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

    this.setLikes(this._likes);

    if (this._ownerId !== this.userId) {
      this._cardElement.querySelector(".card__delete").style.display = "none";
    }

    return this._cardElement;
  };
}