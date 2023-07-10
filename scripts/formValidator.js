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

  _showInputError(formElement) {
    const errorElement = formElement.querySelector(`.${this._inputElement.id}-error`);

    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = this._inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement) {
    const errorElement = formElement.querySelector(`.${this._inputElement.id}-error`);

    this._inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _isValid(formElement) {
    if (!this._inputElement.validity.valid) {
      this._showInputError(formElement);
    } else {
      this._hideInputError(formElement);
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

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    this._inputElement.addEventListener('input', () => {
      this._isValid(formElement);
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