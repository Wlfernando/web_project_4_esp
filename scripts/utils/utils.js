import {
  profile, profileFormPopup, cardFormPopup,
  inputImageTitle, inputProfileName, pageProfileName, inputAboutMe,
  pageAboutMe, cardForm, inputImageSrc, profileForm, cardsContainer,
  } from './constants.js';
import Card from '../components/Card.js';

function handleProfileFormOpen() {
  profileFormPopup.classList.add("popup_active");
}

function handleProfileFormSubmit() {
  pageProfileName.textContent = inputProfileName.value;
  pageAboutMe.textContent = inputAboutMe.value;

  profileForm.reset();

  profileFormPopup.classList.remove("popup_active")
}

function handleCardFormOpen() {
  cardFormPopup.classList.add("popup_active")
}

function handleCardFormSubmit() {
  const inputCard = {
    name: inputImageTitle.value,
    link: inputImageSrc.value
  }
  const card = new Card(inputCard, '#cards');

  cardsContainer.prepend(card.renderCard());
  cardForm.reset();
  cardFormPopup.classList.remove("popup_active");
}

const closeModal = modalElement => {
  modalElement.classList.remove('popup_active');
}

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
      inputImageTitle.value = '';
      inputImageSrc.value = ''
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
  })
}

export {handleProfileFormOpen, handleProfileFormSubmit, handleCardFormOpen,
  handleCardFormSubmit, setCloseEventListeners};