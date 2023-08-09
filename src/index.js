import{
  cardsContainer, formList, formConfig, profileFormBtn, deleteForm,
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
  .then(userData => {
    const user = new UserInfo(userData);
    const popupWithImage = new PopupWithImage(displayCard);

    api.getCards()
      .then(cards => {
        const cardList = new Section ({
          data: cards,
          renderer: (item) => {
            const card = new Card({
              data: item,
              handleOpenClick: (name, link)=> {
                popupWithImage.open(name, link)
              },
              handleDeleteClick: () => {
                const DltForm = new PopupWithForm({
                  handleFormSubmit: () => {
                    api.rmCard(card.id)
                      .then(card.handleRemover())
                  }
                }, deleteForm)
                DltForm.open()
              }
            }, cardTemplate);
            const cardElement = card.renderCard();
            cardList.addItem(cardElement)
            card.isOwner(userData)
          }
        }, cardsContainer)
        cardList.renderItems()

        const userCardForm = new PopupWithForm ({
          handleFormSubmit: (input) => {
            api.postCard(input)
              .then(() => {
                api.getCards()
                  .then(obtainedCard => {
                    const card = new Card ({
                      data: obtainedCard[0],
                      handleOpenClick: (name, link) => {;
                        popupWithImage.open(name, link);
                      },
                      handleDeleteClick: () => {
                        const DltForm = new PopupWithForm({
                          handleFormSubmit: () => {
                            api.rmCard(card.id)
                            .then(card.handleRemover())
                          }
                        }, deleteForm)
                        DltForm.open()
                      }
                    }, cardTemplate)
                    const cardElement = card.renderCard();
                    cardList.addItem(cardElement, 'prepend')
                  })
              })
          }
        }, cardFormPopup)

        profileFormBtn.onclick = () => {
          const {name, about} = document.forms.profileForm.elements;
          userInfoForm.open();
          name.value = user.getUserInfo().name;
          about.value = user.getUserInfo().about
        }

        cardFormBtn.onclick = () => userCardForm.open()

        user.setUserInfo();
        user.setAvatar();
      })
  })

const userInfoForm = new PopupWithForm({
  handleFormSubmit: (input) => {
    api.sendUserForm(input)
      .then(() => {
        const editedUser = new UserInfo(input)
        editedUser.setUserInfo()
        profileFormBtn.onclick = () => {
          const {name, about} = document.forms.profileForm.elements;
          userInfoForm.open();
          name.value = editedUser.getUserInfo().name;
          about.value = editedUser.getUserInfo().about
        }
      })
  }
}, profileFormPopup)

formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  form.enableValidation()
})