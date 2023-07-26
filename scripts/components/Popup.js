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
    const functionListener = (e) => {
      if(e.key === 'Escape'
      || e.target.classList.contains('popup__close-btn')
      || e.target.classList.contains('popup__image-container')
      || e.target.classList.contains('popup_active')){
        this.close();
        this._removeKeydownListener = document.removeEventListener('keydown', functionListener);
        this._removeClickListener = this._popupSelector.removeEventListener('click', functionListener);
      }
    }

    document.addEventListener(
      'keydown', functionListener
    )

    this._popupSelector.addEventListener(
      'click', functionListener
    )
  }
}