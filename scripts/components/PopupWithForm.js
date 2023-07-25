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
    super.setEventListeners();

    this._popupSelector.addEventListener(
      'submit', e => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close()
      }
    )
  }
}