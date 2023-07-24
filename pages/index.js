import{
  cardsContainer, defaultCards, formList, formConfig, profileFormBtn,
  profileForm, cardFormBtn, cardForm, displayCard
} from "../scripts/utils/constants.js";
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import FormValidator from "../scripts/components/FormValidator.js";
import {
  handleProfileFormOpen, handleProfileFormSubmit, handleCardFormOpen,
  handleCardFormSubmit, setCloseEventListeners
} from '../scripts/utils/utils.js';

const defaultCardList = new Section ({
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
    defaultCardList.addItem(cardElement)
  }
}, cardsContainer)

formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  form.enableValidation()
})

defaultCardList.renderItems()
profileFormBtn.addEventListener('click', handleProfileFormOpen)
profileForm.addEventListener('submit', handleProfileFormSubmit)
cardFormBtn.addEventListener('click', handleCardFormOpen)
cardForm.addEventListener('submit', handleCardFormSubmit)
// setCloseEventListeners()