import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._deleteConfirmation = this._popup.querySelector(".popup__save");
  }

  newCallback(newSubmitFormCallback) {
    this._submitFormCallback = newSubmitFormCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteConfirmation.addEventListener("click", () => {
      this._submitFormCallback();
    });
  }
}