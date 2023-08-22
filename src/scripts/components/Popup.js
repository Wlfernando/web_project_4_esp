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
      const clicks = ['button__close', 'popup__image-container', 'popup_active']
      if(e.key === 'Escape'
      || clicks.some(click=> e.target.classList.contains(click))){
        this.close();
        document.removeEventListener('keydown', enableListener);
        this._popupSelector.removeEventListener('click', enableListener);
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