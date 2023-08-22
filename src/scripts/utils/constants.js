// Btns on profile
const profile = document.querySelector(".profile");
const avatar = profile.querySelector('.profile__avatar');
const profileFormBtn = profile.querySelector(".profile__edit-button");
const cardFormBtn = profile.querySelector(".profile__add-button");

// Pop ups
const popupActive = document.querySelectorAll(".popup");

const [
  profileFormPopup,
  cardFormPopup,
  displayCard,
  deleteForm,
  avatarPopup,
  errorPopup
] = popupActive;

const forms = document.forms;

const cardTemplate = '#cards';
const cardsContainer = '.cards';

const formConfig = {
  formSelector: ".popup__container",
  formFieldSet: ".popup__content",
  inputSelector: ".popup__item",
  submitButtonSelector: ".button__submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active"
}

const formList = Array.from(forms);

export {
  profileFormBtn, cardFormBtn, profileFormPopup, cardFormPopup,
  displayCard, cardsContainer, formConfig, cardTemplate, formList,
  deleteForm, avatarPopup, avatar, errorPopup
}