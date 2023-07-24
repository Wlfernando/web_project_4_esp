export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_active')
  }

  close() {
    this._popupSelector.classList.remove('popup_active')
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') this.close()
  }

  _handleClickClose(e) {
    const clicked = ['popup__close-btn', 'popup__image-container', 'popup_active'];
    clicked.forEach(click => {
      if(e.target.classList.contains(click))this.close()
    })
  }

  setEventListeners() {
    document.addEventListener(
      'keydown', e => this._handleEscClose(e)
    )

    this._popupSelector.addEventListener(
      'click', e => this._handleClickClose(e)
    )
  }
}