export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_active');
    this.setEventListeners()
  }

  close() {
    this._popupSelector.classList.remove('popup_active')
  }

  _handleClose(e) {
    const
      clicks = ['button__close', 'popup__image-container', 'popup_active'],
      isClicked = clicks.some(click => e.target.classList.contains(click));

    this._event = e.key === 'Escape' || isClicked;

    if (this._event) {
      this.close();
      document.removeEventListener('keydown', this._enableClose);
      this._popupSelector.removeEventListener('click', this._enableClose);
    }
  }

  setEventListeners() {
    this._enableClose = this._handleClose.bind(this)

    document.addEventListener(
      'keydown', this._enableClose
    )

    this._popupSelector.addEventListener(
      'click', this._enableClose
    )
  }
}