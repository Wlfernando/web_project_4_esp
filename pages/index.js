import{
  cardsContainer, defaultCards, formList, formConfig, profileFormBtn,
  profileFormPopup, cardFormPopup, cardFormBtn, displayCard, cardTemplate
} from "../scripts/utils/constants.js";
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";

const cardList = new Section ({
  data: defaultCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: (name, link)=> {
        const popupWithImage = new PopupWithImage(displayCard);
        popupWithImage.open(name, link);
        popupWithImage.setEventListeners()
      }}, cardTemplate);
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
    }, cardTemplate)
    const cardElement = card.renderCard();
    cardList.addItemBegin(cardElement)
  }
}, cardFormPopup)

const userInfoForm = new PopupWithForm({
  handleFormSubmit: (input) => {
    const user = new UserInfo (input);
    user.setUserInfo();
    const userInput = ({name, job}) => {
      const {profileName, aboutMe} = document.forms.profileForm.elements;
      profileName.value = name;
      aboutMe.value = job
    }
    setTimeout(() => userInput(user.getUserInfo()), 1)
  }
}, profileFormPopup)

formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  form.enableValidation()
})

cardList.renderItems()
profileFormBtn.addEventListener('click', () => userInfoForm.open())
userInfoForm.setEventListeners()
cardFormBtn.addEventListener('click', () => userCardForm.open())
userCardForm.setEventListeners()
