import{
  cardsContainer, defaultCards, formList, formConfig, profileFormBtn,
  profileForm, profileFormPopup, cardFormPopup, cardFormBtn, cardForm,
  displayCard
} from "../scripts/utils/constants.js";
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import FormValidator from "../scripts/components/FormValidator.js";
import {
  handleProfileFormOpen, handleProfileFormSubmit, handleCardFormOpen,
  handleCardFormSubmit, setCloseEventListeners
} from '../scripts/utils/utils.js';
import PopupWithForm from "../scripts/components/PopupWithForm.js";

const cardList = new Section ({
  data: defaultCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: (name, link)=> {
        const popupWithImage = new PopupWithImage(displayCard);
        popupWithImage.open(name, link);
        popupWithImage.setEventListeners()
      }}, '#cards');
    const cardElement = card.renderCard();
    cardList.addItem(cardElement)
  }
}, cardsContainer)

const userCardForm = new PopupWithForm ({
  handleFormSubmit: (input) => {
    const card = new Card ({
      data: input,
      handleCardClick: (name, link)=> {
        const popupWithImage = new PopupWithImage(displayCard);
        popupWithImage.open(name, link);
        popupWithImage.setEventListeners()
      }
    }, '#cards')
    const cardElement = card.renderCard();
    cardList.addItemBegin(cardElement)
  }
}, cardFormPopup)

formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  form.enableValidation()
})

cardList.renderItems()
userCardForm.setEventListeners()
profileFormBtn.addEventListener('click', handleProfileFormOpen)
profileForm.addEventListener('submit', handleProfileFormSubmit)
cardFormBtn.addEventListener('click', () => userCardForm.open())
// cardFormPopup.addEventListener('submit', handleCardFormSubmit)
// setCloseEventListeners()