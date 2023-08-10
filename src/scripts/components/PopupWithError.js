import Popup from './Popup.js';

export default class PopupWithError extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(error) {
    super.open();
    this._popupSelector
      .querySelector('.popup__text-error')
      .textContent = error
  }
}