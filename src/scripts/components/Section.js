export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, position = 'append') {
    this._container[position](element)
  }

  clear() {
    this._container.innerHTML = ''
  }

  renderItems() {
    this.clear()

    this._renderedItems.forEach(item => {
      this._renderer(this, item);
    });
  }
}