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

  _handleClose(e) {
    const
      clicks = ['button__close', 'popup__image-container', 'popup_active'],
      isClicked = clicks.some(click => e.target.classList.contains(click)),
      event = e.key === 'Escape' || isClicked;

    if (event) {
      this.close();
    }
  }

  _removeEventListener() {
    document.removeEventListener('keydown', this._enableClose);
    this._popupSelector.removeEventListener('click', this._enableClose);
  }

  setEventListeners() {
    this._enableClose = this._handleClose.bind(this);

    document.addEventListener(
      'keydown', this._enableClose
    )

    this._popupSelector.addEventListener(
      'click', this._enableClose
    )
  }
}