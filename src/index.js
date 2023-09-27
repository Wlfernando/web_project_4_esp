import{
  cardsContainer, formList, formConfig, profileFormBtn, deleteForm,
  profileFormPopup, cardFormPopup, cardFormBtn, displayCard, cardTemplate,
  avatarPopup, avatar, errorPopup
} from "./scripts/utils/constants.js";
import{ sendCard, sendUser, sendAvatar, handleLikeClick } from './scripts/utils/utils.js';
import Section from './scripts/components/Section.js';
import Card from './scripts/components/Card.js';
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import PopupWithError from './scripts/components/PopupWithError.js';
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

api.me = '/web_es_07/users/me';
api.cards = '/web_es_07/cards';
api.avatar = api.me + '/avatar';
api.likes = api.cards + '/likes';

const
  errorMessage = new PopupWithError(errorPopup),
  popupWithImage = new PopupWithImage(displayCard),
  user = await api.do('GET', api.me)
    .then(userData=> new UserInfo(userData))
    .catch(err => errorMessage.open(err)),
  userId =  user.getUserInfo().id,
  cardList = await api.do('GET', api.cards)
    .then(cards => new Section ({
        data: cards,
        renderer: (item) => {
          const
            card = new Card({
              data: item,
              handleOpenClick: (name, link)=> {
                popupWithImage.open(name, link)
              },
              handleDeleteClick: (id) => {
                const dltForm = new PopupWithForm({
                  handleFormSubmit: () => {
                    api.do('DELETE', api.cards, id)
                      .then(card.handleRemover())
                      .catch(err=> errorMessage.open(err))
                      .finally(()=> dltForm.close())
                  }
                }, deleteForm)
                dltForm.open()
              },
              handleLikeClick
            }, cardTemplate),
            cardElement = card.renderCard();

          card.isVerified(userId)
          cardList.addItem(cardElement)
        }
      }, cardsContainer)
    )
    .catch(err => errorMessage.open(err)),
  cardForm = new PopupWithForm ({
    handleFormSubmit: (input) => {
      api.send('POST', api.cards, ()=> sendCard(input))
        .then(cards => {
          const card = new Card ({
            data: cards.at(0),
            handleOpenClick: (name, link) => {;
              popupWithImage.open(name, link);
            },
            handleDeleteClick: (id) => {
              const dltForm = new PopupWithForm({
                handleFormSubmit: () => {
                  api.do('DELETE', api.cards, id)
                    .then(card.handleRemover())
                    .catch(err=> errorMessage.open(err))
                    .finally(()=> dltForm.close())
                }
              }, deleteForm)
              dltForm.open()
            },
            handleLikeClick
          }, cardTemplate)
          const cardElement = card.renderCard();
          cardList.addItem(cardElement, 'prepend')
        })
        .catch(err => errorMessage.open(err))
        .finally(()=> cardForm.close())
      }
  }, cardFormPopup),
  userForm = new PopupWithForm({
    handleFormSubmit: (input) => {
      api.send('PATCH', api.me, sendUser.bind(this, input))
        .then(userData=> {
          const editedUser = new UserInfo(userData)
          editedUser.setUserInfo()
          profileFormBtn.onclick = () => {
            const {name, about} = document.forms.profileForm.elements;
            userForm.open();
            name.value = editedUser.getUserInfo().name;
            about.value = editedUser.getUserInfo().about
          }
        })
        .catch(err => errorMessage.open(err))
        .finally(()=> userForm.close())
    }
  }, profileFormPopup),
  avatarForm = new PopupWithForm({
    handleFormSubmit: (input) => {
      api.send('PATCH', api.avatar, sendAvatar.bind(this, input), api.me)
        .then(userData=> {
          const editedAvatar = new UserInfo(userData)
          editedAvatar.setAvatar()
      })
        .catch(err=> errorMessage.open(err))
        .finally(()=> avatarForm.close())
    }
  }, avatarPopup);

formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  form.enableValidation()
})

profileFormBtn.onclick = () => {
  const {name, about} = document.forms.profileForm.elements;
  userForm.open();
  name.value = user.getUserInfo().name;
  about.value = user.getUserInfo().about
}

avatar.onclick = () => avatarForm.open()

cardFormBtn.onclick = () => cardForm.open()

user.setUserInfo();

user.setAvatar();

cardList.renderItems();

export {api, user, userId}