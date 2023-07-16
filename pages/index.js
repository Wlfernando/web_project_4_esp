import{
  cardsContainer, defaultCards, formList, formConfig, profileFormBtn,
  profileForm, cardFormBtn, cardForm
} from "../scripts/utils/constants.js";
import Card from '../scripts/components/Card.js';
import FormValidator from "../scripts/components/FormValidator.js";
import {
  handleProfileFormOpen, handleProfileFormSubmit, handleCardFormOpen,
  handleCardFormSubmit, setCloseEventListeners
} from '../scripts/utils/utils.js';

defaultCards.forEach( defaultCard => {
  const card = new Card(defaultCard, '#cards');
  cardsContainer.append(card.renderCard())
})

formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  form.enableValidation()
})

profileFormBtn.addEventListener('click', handleProfileFormOpen)
profileForm.addEventListener('submit', handleProfileFormSubmit)
cardFormBtn.addEventListener('click', handleCardFormOpen)
cardForm.addEventListener('submit', handleCardFormSubmit)
setCloseEventListeners()