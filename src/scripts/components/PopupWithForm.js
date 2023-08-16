import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector('.popup__container');
  }

  close() {
    super.close();
    this._form.reset();
    this._isDone()
  }

  _isDone() {
    this._form
      .querySelector('.popup__processing-btn')
      .style.visibility = 'hidden'
  }

  _process() {
    this._form
      .querySelector('.popup__processing-btn')
      .style.visibility = 'visible'
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__item');
    this._formValues = {};
    this._inputList.forEach(input =>
      this._formValues[input.name] = input.value);
    return this._formValues
  }

  setEventListeners() {
    const rmEventListeners = () => {
      document.removeEventListener('keydown', enableListener);
      this._popupSelector.removeEventListener('click', enableListener);
      this._popupSelector.removeEventListener('submit', enableListener)
    }

    const enableListener = (e) => {
      const clicks = ['popup__close-btn', 'popup_active']
    if(e.key === 'Escape'
      || clicks.some(click=> e.target.classList.contains(click))){
        this.close();
        rmEventListeners()

      } else if(e.target.classList.contains('popup__save-btn')) {
        this._handleFormSubmit(this._getInputValues());
        rmEventListeners()
        this._process()
      }
    }

    document.addEventListener(
      'keydown', enableListener
    )

    this._popupSelector.addEventListener(
      'click', enableListener
    )

    this._popupSelector.addEventListener(
      'submit', enableListener
    )
  }
}