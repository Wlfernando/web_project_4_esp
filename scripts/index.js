// Btns on profile
const profile = document.querySelector(".profile");
const editProfileBtn = profile.querySelector(".profile__edit-button");
const addBtn = profile.querySelector(".profile__add-button");

// Pop ups
const popUpActive = profile.querySelectorAll(".popup");
const popUpProfileForm = popUpActive[0];
const inputImg = popUpActive[1];
const displayImage = popUpActive[2];

// Popup profile
const profileForm = document.forms.profileForm;
const inputProfileName = document.forms.profileForm.elements.profileName;
const pageProfileName = profile.querySelector('.profile__user-name');
const inputAboutMe = document.forms.profileForm.elements.aboutMe;
const pageAboutMe = profile.querySelector('.profile__about-me');
const saveBtn = document.forms.profileForm.elements.saveBtn;

const imageForm = document.forms.imageForm;
const cardsContainer = document.querySelector('.cards');

editProfileBtn.addEventListener("click", function openProfileEdit () {
  popUpProfileForm.classList.add("popup_active")
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleProfileFormSubmit(){
  pageProfileName.textContent = inputProfileName.value;
  pageAboutMe.textContent = inputAboutMe.value;

  profileForm.reset();

  popUpProfileForm.classList.remove("popup_active")
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

function renderCard (name, link) {
  const cardTemplate = document.querySelector('#cards').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const rmBtn = cardElement.querySelector('.card__trash-button');
  const likeBtn = cardElement.querySelector('.card__like-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__place-name').textContent = name;

  cardsContainer.prepend(cardElement);

  cardImage.addEventListener('click', () => {
    displayImage.querySelector('.popup__title-image').textContent = name;
    displayImage.querySelector('.popup__image').src = link;
    displayImage.querySelector('.popup__image').alt = name;
    displayImage.classList.add("popup_active");
});

  likeBtn.addEventListener('click', evt =>
    evt.target.classList.toggle('card__like-button_active')
  );

  rmBtn.addEventListener('click', () => {
    const card = rmBtn.closest('.card');
    card.remove();
  });
};

defaultCards.forEach(card => renderCard(card.name, card.link));

addBtn.addEventListener("click", function openImageForm () {
  inputImg.classList.add("popup_active")
});

imageForm.addEventListener('submit', handleImageFormSubmit);

function handleImageFormSubmit(){
  const inputImageTitle = document.forms.imageForm.elements.imageName;
  const inputImageSrc = document.forms.imageForm.elements.imageSrc;

  renderCard(inputImageTitle.value, inputImageSrc.value);

  imageForm.reset();

  inputImg.classList.remove("popup_active");
};

const closeModal = modalElement => {
  modalElement.classList.remove('popup_active');
};

const enableClose = () => {
  const modalList = Array.from(profile.querySelectorAll(".popup"));

  modalList.forEach(modalElement => {
    const closeBtn = modalElement.querySelector('.popup__close-btn');
    closeBtn.addEventListener('click', () =>
    closeModal(modalElement))
  })
};

enableClose();

//Form Validity
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__item-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__item_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__item-error_active');
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
      buttonElement.classList.add("button_inactive");
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove("button_inactive");
      buttonElement.removeAttribute('disabled');
    }
  };

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
  const buttonElement = formElement.querySelector(".popup__save-btn");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
  })
})};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt =>
  evt.preventDefault()
  );

  const fieldsetList = Array.from(formElement.querySelectorAll(".popup__content"));

  fieldsetList.forEach((fieldset) => {
    setEventListeners(fieldset);

  })
})};

enableValidation();