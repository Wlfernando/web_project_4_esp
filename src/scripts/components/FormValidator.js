export default class FormValidator {
  constructor(config) {
    this._formSelector = config.formSelector;
    this._formFieldSet = config.formFieldSet;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(fieldset, inputElement, errorMessage) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(fieldset, inputElement) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _isValid(fieldset, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldset, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(fieldset, inputElement);
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
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners(form, fieldset) {
    const inputList = Array.from(fieldset.querySelectorAll(this._inputSelector));
    const buttonElement = fieldset.querySelector(this._submitButtonSelector);
    const waitingApi = 1200;

    this._toggleButtonState(inputList, buttonElement);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      setTimeout(()=> this._toggleButtonState(inputList, buttonElement), waitingApi);
    })

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(fieldset, inputElement);
        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  enableValidation() {
    Array
      .from(document.querySelectorAll(this._formSelector))
      .forEach(form => {
        Array
          .from(form.querySelectorAll(this._formFieldSet))
          .forEach(fieldset => {
            this._setEventListeners(form, fieldset)
        })
      })
  }
}