import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(name, link) {
    super.open();
    const displayCardImage = this._popupSelector.querySelector('.popup__image');
    this._popupSelector.querySelector('.popup__title-image').textContent = name;
    displayCardImage.src = link;
    displayCardImage.alt = name;
  }
}