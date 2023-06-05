// Btns on profile
const profile = document.querySelector(".profile");
const editProfileBtn = profile.querySelector(".profile__edit-button");
const addBtn = profile.querySelector(".profile__add-button");

// Pop ups
const popUpActive = profile.querySelectorAll(".popup");
const popUpProfileForm = popUpActive[0];
const inputImg = popUpActive[1];
const displayImage = popUpActive[2];
const closeBtn = profile.querySelectorAll(".popup__close-btn");

// Popup profile
const formProfile = popUpActive[0].querySelector('.profile-form');
const inputProfileName = popUpActive[0].querySelector('[name="profileName"]');
const pageProfileName = profile.querySelector('.profile__user-name');
const inputAboutMe = popUpActive[0].querySelector('[name="aboutMe"]');
const pageAboutMe = profile.querySelector('.profile__about-me');
const saveBtn = popUpActive[0].querySelector('.popup__save-btn');

const formImage = popUpActive[1].querySelector('.image-form');
const cardsContainer = document.querySelector('.cards');

editProfileBtn.addEventListener("click", function openProfileEdit () {
  popUpProfileForm.classList.add("popup_active")
});

const closeInputProfile = closeBtn[0].addEventListener("click", function closeProfileEdit () {
  popUpProfileForm.classList.remove("popup_active")
});

formProfile.addEventListener('submit', handleProfileFormSubmit);

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  pageProfileName.textContent = inputProfileName.value;
  pageAboutMe.textContent = inputAboutMe.value;
  // popUpProfileForm.classList.remove("popup_active")
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

function renderCards (name, link) {
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

defaultCards.forEach(card => renderCards(card.name, card.link));

addBtn.addEventListener("click", function openImageForm () {
  inputImg.classList.add("popup_active")
});

const closeInputImage = closeBtn[1].addEventListener("click", function closeImageAdd () {
  inputImg.classList.remove("popup_active")
});


formImage.addEventListener('submit', handleImageFormSubmit);

function handleImageFormSubmit(evt){
  evt.preventDefault();
  const inputImageTitle = document.querySelector('[name="imageName"]');
  const inputImageSrc = document.querySelector('[name="imageSrc"]');

  renderCards(inputImageTitle.value, inputImageSrc.value);

  inputImageTitle.value = '';
  inputImageSrc.value = '';
  // inputImg.classList.remove("popup_active");
};

const closePopUpImage = closeBtn[2].addEventListener("click", function closeImageAdd () {
  displayImage.classList.remove("popup_active")
});