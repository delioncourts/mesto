import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popupSelector.querySelector(".popup__open-photo-subtitle");
    this._image = this._popupSelector.querySelector(".popup__open-photo");
  }

  open(text, link) {
    this._caption.textContent = text;
    this._image.src = link;
    this._image.alt = text;

    super.open();
  }
}