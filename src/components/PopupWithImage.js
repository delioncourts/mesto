import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(text, link) {
    const caption = this._popup.querySelector(".popup__open-photo-subtitle");
    const image = this._popup.querySelector(".popup_type_open-card");

    caption.textContent = text;
    image.src = link;

    super.open();
  }
}