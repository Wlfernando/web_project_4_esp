export default class FormValidator {
  constructor(config, inputElement){
    this._formSelector = config.formSelector;
    this._formFieldSet = config.formFieldSet;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._inputElement = inputElement
  }

  _showInputError(fieldset) {
    const errorElement = fieldset.querySelector(`.${this._inputElement.id}-error`);

    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = this._inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(fieldset) {
    const errorElement = fieldset.querySelector(`.${this._inputElement.id}-error`);

    this._inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _isValid(fieldset) {
    if (!this._inputElement.validity.valid) {
      this._showInputError(fieldset);
    } else {
      this._hideInputError(fieldset);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners(fieldset) {
    const inputList = Array.from(fieldset.querySelectorAll(this._inputSelector));
    const buttonElement = fieldset.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    this._inputElement.addEventListener('input', () => {
      this._isValid(fieldset);
      this._toggleButtonState(inputList, buttonElement)
    })
  }

  resetBtnState(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach(formElement => {
      formElement.addEventListener('submit', e => {
        e.preventDefault();
      })

      const fieldsetList = Array.from(formElement.querySelectorAll(this._formFieldSet));

      fieldsetList.forEach((fieldset) => {
        this._setEventListeners(fieldset);
      })
    })
  }
}