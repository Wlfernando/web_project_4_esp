const profile = document.querySelector(".profile");
const editBtn = profile.querySelector(".profile__edit-button");
const popUpActive = profile.querySelectorAll(".popup");
const modalEditProfile = popUpActive[0];
const addBtn = profile.querySelector(".profile__add-button");
const modalUploadImg = popUpActive[1];
const closeBtn = profile.querySelectorAll(".modal-box__close-btn");
const inputProfileName = popUpActive[0].querySelector('[name="profileName"]');
const pageProfileName = profile.querySelector('.profile__user-name');
const inputAboutMe = popUpActive[0].querySelector('[name="aboutMe"]');
const pageAboutMe = profile.querySelector('.profile__about-me');
const saveBtn = popUpActive[0].querySelector('.modal-box__save-btn')

editBtn.addEventListener("click", function openProfileEdit () {
  modalEditProfile.classList.remove("popup_active")
});

closeBtn[0].addEventListener("click", function closeProfileEdit () {
  modalEditProfile.classList.add("popup_active")
});

saveBtn.addEventListener('click', function editProfile() {
  pageProfileName.textContent = inputProfileName.value;
  pageAboutMe.textContent = inputAboutMe.value;
  modalEditProfile.classList.add("popup_active")
});

addBtn.addEventListener("click", function openImageAdd () {
  modalUploadImg.classList.remove("popup_active")
});

closeBtn[1].addEventListener("click", function closeImageAdd () {
  modalUploadImg.classList.add("popup_active")
});

