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
      document.removeEventListener('keydown', functionListener);
      this._popupSelector.removeEventListener('click', functionListener);
      this._popupSelector.removeEventListener('submit', functionListener)
    }

    const functionListener = (e) => {
    if(e.key === 'Escape'
      || e.target.classList.contains('popup__close-btn')
      || e.target.classList.contains('popup__image-container')
      || e.target.classList.contains('popup_active')){
        this.close();
        rmEventListeners()

      } else if(e.key === 'Enter'
      || e.target.classList.contains('popup__save-btn')) {
        this._handleFormSubmit(this._getInputValues());
        this.close()
        rmEventListeners();
      }
    }

    document.addEventListener(
      'keydown', functionListener
    )

    this._popupSelector.addEventListener(
      'click', functionListener
    )

    this._popupSelector.addEventListener(
      'submit', functionListener
    )
  }
}