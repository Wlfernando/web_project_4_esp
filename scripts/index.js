const profile = document.querySelector(".profile");
const editProfileBtn = profile.querySelector(".profile__edit-button");
const popUpActive = profile.querySelectorAll(".popup");
const popUpProfileForm = popUpActive[0];
const addBtn = profile.querySelector(".profile__add-button");
const modalUploadImg = popUpActive[1];
const closeBtn = profile.querySelectorAll(".modal-box__close-btn");
const inputProfileName = popUpActive[0].querySelector('[name="profileName"]');
const pageProfileName = profile.querySelector('.profile__user-name');
const inputAboutMe = popUpActive[0].querySelector('[name="aboutMe"]');
const pageAboutMe = profile.querySelector('.profile__about-me');
const saveBtn = popUpActive[0].querySelector('.modal-box__save-btn');
const formElement = popUpActive[0].querySelector('.profile-form');

editProfileBtn.addEventListener("click", function openProfileEdit () {
  popUpProfileForm.classList.add("popup_active")
});

closeBtn[0].addEventListener("click", function closeProfileEdit () {
  popUpProfileForm.classList.remove("popup_active")
});

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   pageProfileName.textContent = inputProfileName.value;
//   pageAboutMe.textContent = inputAboutMe.value;
//   popUpProfileForm.classList.remove("popup_active")
// }

// saveBtn.addEventListener('submit', handleProfileFormSubmit);
formElement.addEventListener('submit', handleProfileFormSubmit);

function handleProfileFormSubmit(event){
  event.preventDefault();
  pageProfileName.textContent = inputProfileName.value;
  pageAboutMe.textContent = inputAboutMe.value;
  popUpProfileForm.classList.remove("popup_active")
};

// handleProfileFormSubmit();

// saveBtn.addEventListener('click', function editProfile() {
//   pageProfileName.textContent = inputProfileName.value;
//   pageAboutMe.textContent = inputAboutMe.value;
//   PopUpProfileForm.classList.remove("popup_active")
// });

addBtn.addEventListener("click", function openImageAdd () {
  modalUploadImg.classList.add("popup_active")
});

closeBtn[1].addEventListener("click", function closeImageAdd () {
  modalUploadImg.classList.remove("popup_active")
});