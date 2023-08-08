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

  setEventListeners() {
    const enableListener = (e) => {
      if(e.key === 'Escape'
      || e.target.classList.contains('popup__close-btn')
      || e.target.classList.contains('popup__image-container')
      || e.target.classList.contains('popup_active')){
        this.close();
        this._removeKeydownListener = document.removeEventListener('keydown', enableListener);
        this._removeClickListener = this._popupSelector.removeEventListener('click', enableListener);
      }
    }

    document.addEventListener(
      'keydown', enableListener
    )

    this._popupSelector.addEventListener(
      'click', enableListener
    )
  }
}