import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(name, link) {
    const displayCardImage = this._popupSelector.querySelector('.popup__image');

    super.open();
    this._popupSelector.querySelector('.popup__title-image').textContent = name;
    displayCardImage.src = link;
    displayCardImage.alt = name;
  }
}