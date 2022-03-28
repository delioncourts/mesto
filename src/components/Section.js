export class Section {
    constructor({ items, renderer }, contsainerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(contsainerSelector);
    }
  
    renderItems() {
      this._items.forEach((item) => {
        this._renderer(item, this._container);
      });
    }
  
    addItem(element) {
      this._container.prepend(element);
    }
  }  