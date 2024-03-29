import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector){ 
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.popup__form');
      }
  
      setFormSubmitHandler(handler) {
        this._handleSubmitCallback = handler;
    }
  
      setEventListeners() {
        super.setEventListeners();
  
        this._form.addEventListener('submit',(evt) => {
          evt.preventDefault();
          this._handleSubmitCallback();
        })
      }
    }