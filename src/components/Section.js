export class Section {
    constructor({ items, renderer }, contsainerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(contsainerSelector);
    }
  
    renderItems() {
      this._items.forEach((data) => {
        this._renderer(data, this._container);
      });
    }
  
    addItem(element) {
      this._container.prepend(element);
    }
  }  