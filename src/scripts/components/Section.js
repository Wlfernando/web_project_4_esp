export default class Section {
  constructor({ data, deliver }, containerSelector) {
    this._renderedItems = data;
    this._renderer = deliver;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element)
  }

  addItemBegin(element) {
    this._container.prepend(element)
  }

  clear() {
    this.container.innerHTML = ''
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}