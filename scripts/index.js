// Btns on profile
const profile = document.querySelector(".profile");
const profileFormBtn = profile.querySelector(".profile__edit-button");
const cardFormBtn = profile.querySelector(".profile__add-button");

// Pop ups
const popUpActive = profile.querySelectorAll(".popup");

// Popup profile
const profileForm = document.forms.profileForm;
const inputProfileName = document.forms.profileForm.elements.profileName;
const pageProfileName = profile.querySelector('.profile__user-name');
const inputAboutMe = document.forms.profileForm.elements.aboutMe;
const pageAboutMe = profile.querySelector('.profile__about-me');
const saveBtn = document.forms.profileForm.elements.saveBtn;

const imageForm = document.forms.imageForm;
const cardsContainer = document.querySelector('.cards');

profileFormBtn.addEventListener("click", function () {
  popUpActive[0].classList.add("popup_active");
})

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
  const displayImage = popUpActive[2];
  const rmBtn = cardElement.querySelector('.card__trash-button');
  const likeBtn = cardElement.querySelector('.card__like-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__place-name').textContent = name;

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

  return cardElement;
};

defaultCards.forEach(card => cardsContainer.append(renderCard(card.name, card.link)))

cardFormBtn.addEventListener("click", function () {
  popUpActive[1].classList.add("popup_active")
});

imageForm.addEventListener('submit', handleCardFormSubmit);

function handleCardFormSubmit(){
  const inputImageTitle = document.forms.imageForm.elements.imageName;
  const inputImageSrc = document.forms.imageForm.elements.imageSrc;

  cardsContainer.prepend(renderCard(inputImageTitle.value, inputImageSrc.value));

  imageForm.reset();

  popUpActive[1].classList.remove("popup_active");
};

const closeModal = modalElement => {
  modalElement.classList.remove('popup_active');
};

function enableClose() {
  const modalList = Array.from(profile.querySelectorAll(".popup"));

  modalList.forEach(modalElement => {
    document.addEventListener('keydown', evt => {
    if(evt.key === 'Escape'){
      closeModal(modalElement)
    }})});

  modalList.forEach(modalElement => {
    modalElement.addEventListener('click', (evt) => {
      const closeBtn = modalElement.querySelector('.popup__close-btn');
      if(
        evt.target === document.querySelector('.popup_active') ||
        evt.target === document.querySelector('.popup__image-container') ||
        evt.target === closeBtn) {
      closeModal(modalElement)}
  })})
};

enableClose();