import Card from './card.js';
import FormValidator from './formValidator.js';

// Btns on profile
const profile = document.querySelector(".profile");
const profileFormBtn = profile.querySelector(".profile__edit-button");
const cardFormBtn = profile.querySelector(".profile__add-button");

// Pop ups
export const popUpActive = profile.querySelectorAll(".popup");

// Popup profile
const inputImageTitle = document.forms.imageForm.elements.imageName;
const inputProfileName = document.forms.profileForm.elements.profileName;
const pageProfileName = profile.querySelector('.profile__user-name');
const inputAboutMe = document.forms.profileForm.elements.aboutMe;
const pageAboutMe = profile.querySelector('.profile__about-me');

// Popup Card submit
const imageForm = document.forms.imageForm;
const inputImageSrc = document.forms.imageForm.elements.imageSrc;
const profileForm = document.forms.profileForm;
const cardsContainer = document.querySelector('.cards');

const formConfig = {
  formSelector: ".popup__container",
  formFieldSet: ".popup__content",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__item-error_active"
}

const inputElements = Array.from(document.querySelectorAll('.popup__item'));

inputElements.forEach(inputElement => {
  const element = new FormValidator(formConfig, inputElement);
  element.enableValidation()
})

profileFormBtn.addEventListener("click", function () {
  popUpActive[0].classList.add("popup_active");
})

profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleProfileFormSubmit(){
  pageProfileName.textContent = inputProfileName.value;
  pageAboutMe.textContent = inputAboutMe.value;

  profileForm.reset();

  popUpActive[0].classList.remove("popup_active")
};

const defaultCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
}
];

defaultCards.forEach( defaultCard => {
  const card = new Card(defaultCard, '#cards');
  cardsContainer.append(card.renderCard())
})

cardFormBtn.addEventListener("click", function () {
  popUpActive[1].classList.add("popup_active")
});

imageForm.addEventListener('submit', handleCardFormSubmit);

function handleCardFormSubmit(){
  const inputCard = {};
  inputCard.name = inputImageTitle.value;
  inputCard.link = inputImageSrc.value;
  const card = new Card(inputCard, '#cards')

  cardsContainer.prepend(card.renderCard());

  imageForm.reset();

  popUpActive[1].classList.remove("popup_active");
};

const closeModal = modalElement => {
  modalElement.classList.remove('popup_active');
};

const clearContent = modalElement => {
  setTimeout(() => {
    if(modalElement.querySelector('.popup__image-container')) {
      modalElement.querySelector('.popup__title-image').textContent = '';
      modalElement.querySelector('.popup__image').src = '';
      modalElement.querySelector('.popup__image').alt = ''
    } else if(modalElement.querySelector('.profile-form')) {
      inputProfileName.value = 'Jacques Cousteau';
      inputAboutMe.value = 'Explorador'
    } else {
      inputImageTitle.value = null;
      inputImageSrc.value = null
    }
  }, 200)
}

function setCloseEventListeners() {
  const modalList = Array.from(profile.querySelectorAll(".popup"));

  modalList.forEach(modalElement => {
    document.addEventListener('keydown', evt => {
      if(evt.key === 'Escape'){
          closeModal(modalElement);
          clearContent(modalElement)
        }
    })
    modalElement.addEventListener('click', evt => {
      const closeBtn = modalElement.querySelector('.popup__close-btn');
      if(
        evt.target === document.querySelector('.popup_active') ||
        evt.target === document.querySelector('.popup__image-container') ||
        evt.target === closeBtn) {
          closeModal(modalElement);
          clearContent(modalElement)
        }
    })
  });
};

setCloseEventListeners();