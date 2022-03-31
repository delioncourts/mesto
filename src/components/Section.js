export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialCards = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialCards.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }
}