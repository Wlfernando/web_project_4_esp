import { profile, profileFormBtn, cardFormBtn, popUpActive, inputImageTitle,
  inputProfileName, pageProfileName, inputAboutMe, pageAboutMe, cardForm,
  inputImageSrc, profileForm, cardsContainer, inputElements, formConfig,
  defaultCards}
from './index.js';
import Card from './card.js';
import FormValidator from './formValidator.js';

defaultCards.forEach( defaultCard => {
  const card = new Card(defaultCard, '#cards');
  cardsContainer.append(card.renderCard())
})

inputElements.forEach(inputElement => {
  const element = new FormValidator(formConfig, inputElement);
  element.enableValidation()
})

profileFormBtn.addEventListener("click", function handleProfileFormOpen() {
  popUpActive[0].classList.add("popup_active");
})

profileForm.addEventListener('submit', function handleProfileFormSubmit() {
  pageProfileName.textContent = inputProfileName.value;
  pageAboutMe.textContent = inputAboutMe.value;

  profileForm.reset();

  popUpActive[0].classList.remove("popup_active")
})

cardFormBtn.addEventListener("click", function handleCardFormOpen() {
  popUpActive[1].classList.add("popup_active")
  inputElements.forEach(inputElement => {
    const formBtn = new FormValidator(formConfig, inputElement);
    formBtn.resetBtnState(popUpActive[1].querySelector('.popup__save-btn'))
  })
});

cardForm.addEventListener('submit', function handleCardFormSubmit() {
  const inputCard = {};
  inputCard.name = inputImageTitle.value;
  inputCard.link = inputImageSrc.value;
  const card = new Card(inputCard, '#cards')

  cardsContainer.prepend(card.renderCard());

  cardForm.reset();

  popUpActive[1].classList.remove("popup_active");
});

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

setCloseEventListeners()