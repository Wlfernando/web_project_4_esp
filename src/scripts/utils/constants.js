// Btns on profile
const profile = document.querySelector(".profile");
const profileFormBtn = profile.querySelector(".profile__edit-button");
const cardFormBtn = profile.querySelector(".profile__add-button");

// Pop ups
const popupActive = profile.querySelectorAll(".popup");
const [profileFormPopup, cardFormPopup, displayCard] = popupActive;
const forms = document.forms;
const {profileForm, cardForm} = forms;
const {profileName: inputProfileName, aboutMe: inputAboutMe} = profileForm.elements;
const {imageName: inputImageTitle, imageSrc: inputImageSrc} = cardForm.elements;

const pageProfileName = profile.querySelector('.profile__user-name');
const pageAboutMe = profile.querySelector('.profile__about-me');

const cardTemplate = '#cards';
const cardsContainer = '.cards';

const formConfig = {
  formSelector: ".popup__container",
  formFieldSet: ".popup__content",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active"
}

const formList = Array.from(forms);

export { profile, profileFormBtn, cardFormBtn, profileFormPopup, cardFormPopup,
  displayCard, inputImageTitle, inputProfileName, pageProfileName, inputAboutMe,
  pageAboutMe, cardForm, inputImageSrc, profileForm, cardsContainer,
  formConfig, cardTemplate, formList}