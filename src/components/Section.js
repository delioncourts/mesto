export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialCards = items; 
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }

  renderItems() {
    this._initialCards.forEach((item) => {
        this._renderer(item);
    });
}
}