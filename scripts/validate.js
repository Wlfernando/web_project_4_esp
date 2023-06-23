const formValidation = {
  formSelector: ".popup__container",
  formFieldSet: ".popup__content",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active"
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(formValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formValidation.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(formValidation.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(formValidation.errorClass);
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }};

  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(formValidation.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(formValidation.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(formValidation.inputSelector));
  const buttonElement = formElement.querySelector(formValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
  })
})};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formValidation.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt =>
  evt.preventDefault()
  );

  const fieldsetList = Array.from(formElement.querySelectorAll(formValidation.formFieldSet));

  fieldsetList.forEach((fieldset) => {
    setEventListeners(fieldset);

  })
})};

enableValidation();