import{
  cardsContainer, defaultCards, formList, formConfig, profileFormBtn,
  profileFormPopup, cardFormPopup, cardFormBtn, displayCard, cardTemplate
} from "./scripts/utils/constants.js";
import Section from './scripts/components/Section.js';
import Card from './scripts/components/Card.js';
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import UserInfo from "./scripts/components/UserInfo.js";
import FormValidator from "./scripts/components/FormValidator.js";
import './pages/index.css';

const cardList = new Section ({
  data: defaultCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleOpenClick: (name, link)=> {
        const popupWithImage = new PopupWithImage(displayCard);
        popupWithImage.open(name, link);
      }}, cardTemplate);
    const cardElement = card.renderCard();
    cardList.addItem(cardElement)
  }
}, cardsContainer)

const userCardForm = new PopupWithForm ({
  handleFormSubmit: (input) => {
    const card = new Card ({
      data: input,
      handleOpenClick: (name, link)=> {
        const popupWithImage = new PopupWithImage(displayCard);
        popupWithImage.open(name, link);
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
    const userInput = ({nameUser, jobUser}) => {
      const {profileName, aboutMe} = document.forms.profileForm.elements;
      profileName.value = nameUser;
      aboutMe.value = jobUser
    }
    setTimeout(() => userInput(user.getUserInfo()))
  }
}, profileFormPopup)

formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  form.enableValidation()
})

cardList.renderItems()
profileFormBtn.addEventListener('click', () => userInfoForm.open())
cardFormBtn.addEventListener('click', () => userCardForm.open())