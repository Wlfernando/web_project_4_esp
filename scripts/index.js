// Btns on profile
const profile = document.querySelector(".profile");
const editProfileBtn = profile.querySelector(".profile__edit-button");
const addBtn = profile.querySelector(".profile__add-button");

// Pop ups
const popUpActive = profile.querySelectorAll(".popup");
const popUpProfileForm = popUpActive[0];
const inputImg = popUpActive[1];
const closeBtn = profile.querySelectorAll(".popup__close-btn");

// Popup profile
const formProfile = popUpActive[0].querySelector('.profile-form');
const inputProfileName = popUpActive[0].querySelector('[name="profileName"]');
const pageProfileName = profile.querySelector('.profile__user-name');
const inputAboutMe = popUpActive[0].querySelector('[name="aboutMe"]');
const pageAboutMe = profile.querySelector('.profile__about-me');
const saveBtn = popUpActive[0].querySelector('.popup__save-btn');

const cards = [
  {
  name: "Valle de Yosemite",
  link: "../images/Card/Yosemite's-Valley.jpg"
},
{
  name: "Lago Louise",
  link: "../images/Card/Louise's-lake.jpg"
},
{
  name: "Montañas Calvas",
  link: "../images/Card/bald-mountains.jpg"
},
{
  name: "Latemar",
  link: "../images/Card/Latemar.jpg"
},
{
  name: "Parque Nacional de la Vanoise",
  link: "../images/Card/Vanois-National.jpg"
},
{
  name: "Lago di Braies",
  link: "../images/Card/Lago-di-Braies.jpg"
}
];

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
  popUpProfileForm.classList.remove("popup_active")
};

addBtn.addEventListener("click", function openImageAdd () {
  inputImg.classList.add("popup_active")
});

const closeInputImage = closeBtn[1].addEventListener("click", function closeImageAdd () {
  inputImg.classList.remove("popup_active")
});

const formImage = popUpActive[1].querySelector('.image-form');
const displayImage = popUpActive[2];

formImage.addEventListener('submit', handleImageFormSubmit);

function handleImageFormSubmit(evt){
  evt.preventDefault();
  let inputImageTitle = document.querySelector('[name="imageName"]').value;
  let inputImageSrc = document.querySelector('[name="imageSrc"]').value;
  let popUpImageContent = profile.querySelector('.popup__image-container');
  popUpImageContent.querySelector('.popup__title-image').textContent = inputImageTitle;
  popUpImageContent.querySelector('.popup__image').src = inputImageSrc;
  inputImg.classList.remove("popup_active");
  displayImage.classList.add("popup_active");
};

const closePopUpImage = closeBtn[2].addEventListener("click", function closeImageAdd () {
  displayImage.classList.remove("popup_active")
});