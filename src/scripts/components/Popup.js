export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_active');
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_active');
    this._removeEventListener();
  }

  _handleClose = (e) => {
    const
      isClicked = ['button__close', 'popup__image-container', 'popup_active']
        .some(click => e.target.classList.contains(click)),
      event = e.key === 'Escape' || isClicked;

    if (event) {
      this.close();
    }
  }

  _removeEventListener() {
    this._popupSelector.removeEventListener('click', this._handleClose);
    document.removeEventListener('keydown', this._handleClose);
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleClose);
    this._popupSelector.addEventListener('click', this._handleClose);
  }
}