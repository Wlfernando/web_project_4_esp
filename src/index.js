import{
  cardsContainer, formList, formConfig, profileFormBtn, profile,
  profileFormPopup, cardFormPopup, cardFormBtn, displayCard, cardTemplate
} from "./scripts/utils/constants.js";
import Section from './scripts/components/Section.js';
import Card from './scripts/components/Card.js';
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import UserInfo from "./scripts/components/UserInfo.js";
import FormValidator from "./scripts/components/FormValidator.js";
import './pages/index.css';
import Api from './scripts/components/Api.js';

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1",
  headers: {
    authorization: "4f0ec2d8-0a82-401b-be94-8d93fd8bc4fc",
    "Content-Type": "application/json"
  }
})

api.getUserData()
  .then(object => {
    const user = new UserInfo(object);
    user.setUserInfo();
    user.setAvatar()
    return user
  })
  .then(user => {
    profileFormBtn.onclick = () => {
      const {name, about} = document.forms.profileForm.elements;
      userInfoForm.open();
      name.value = user.getUserInfo().name;
      about.value = user.getUserInfo().about
    }
  })

api.getInitialCards()
  .then(array => {
    const cardListInit = new Section ({
      data: array,
      renderer: (item) => {
        const card = new Card({
          data: item,
          handleOpenClick: (name, link)=> {
            const popupWithImage = new PopupWithImage(displayCard);
            popupWithImage.open(name, link);
          }}, cardTemplate);
        const cardElement = card.renderCard();
        cardListInit.addItem(cardElement)
      }
    }, cardsContainer)
    cardListInit.renderItems()
  })

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
    api.sendUserForm(input)
      .then(()=>{
        const userEdited = new UserInfo(input)
        userEdited.setUserInfo()
        profileFormBtn.onclick = () => {
          const {name, about} = document.forms.profileForm.elements;
          userInfoForm.open();
          name.value = userEdited.getUserInfo().name;
          about.value = userEdited.getUserInfo().about
        }
      })
  }
}, profileFormPopup)

formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  form.enableValidation()
})

// profileFormBtn.addEventListener('click', () => userInfoForm.open())
cardFormBtn.addEventListener('click', () => userCardForm.open())