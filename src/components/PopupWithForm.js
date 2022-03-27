import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
constructor(popupSelector, handleSubmit) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector(".popup__form")
    this._inputs = [...this._form.querySelectorAll(".popup__input")]
    this._values = {}
}

_getInputValues() {
this._values = {}
this._inputs.forEach((input) => {
    this._values[input.name] = input.value
})
return this._values
}

setEventListeners() {
super.setEventListeners()
this._form.addEventListener("submit", (event) => {
    event.preventDefault();
    this._handleSubmit(this._getInputValues())
})
}

close() {
    super.close()
    this._form.reset()
}
}