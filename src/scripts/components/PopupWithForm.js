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
    this._isDone();
  }

  _isDone() {
    this._form
      .querySelector('.button__submit_processing')
      .style.visibility = 'hidden'
  }

  _process() {
    this._form
      .querySelector('.button__submit_processing')
      .style.visibility = 'visible'
  }

  get _InputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__item');
    this._formValues = {};

    this._inputList.forEach(input =>
      this._formValues[input.name] = input.value);

    return this._formValues
  }

  _handleSubmit() {
    this._process();
    this._handleFormSubmit(this._InputValues);
  }

  _removeEventListener() {
    super._removeEventListener();
    this._popupSelector.removeEventListener('submit', this._enableSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._enableSubmit = this._handleSubmit.bind(this);

    this._popupSelector.addEventListener(
      'submit', this._enableSubmit
    )
  }
}