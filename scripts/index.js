const profile = document.querySelector(".profile");
const editBtn = profile.querySelector(".profile__edit-button");
const popUpActive = profile.querySelectorAll(".popup");
const modalEditProfile = popUpActive[0];
const addBtn = profile.querySelector(".profile__add-button");
const modalAddImg = popUpActive[1];
const closeBtn = profile.querySelectorAll(".modal-box__close-btn");

editBtn.addEventListener("click", function openProfileEdit () {
  modalEditProfile.classList.remove("popup_active")
});

closeBtn[0].addEventListener("click", function closeProfileEdit () {
  modalEditProfile.classList.add("popup_active")
});

addBtn.addEventListener("click", function openImageAdd () {
  modalAddImg.classList.remove("popup_active")
});

closeBtn[1].addEventListener("click", function closeImageAdd () {
  modalAddImg.classList.add("popup_active")
});

