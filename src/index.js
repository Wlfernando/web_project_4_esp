import{
  formList, formConfig, profileFormBtn,
  profileFormPopup, cardFormPopup, cardFormBtn, displayCard,
  avatarPopup, avatar, errorPopup
} from "./scripts/utils/constants.js";
import{ sendCard, sendUser, sendAvatar, setCardsSection } from './scripts/utils/utils.js';
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
  showError = errorMessage.open.bind(errorMessage),

  popupWithImage = new PopupWithImage(displayCard),

  user = await api.do('GET', api.me)
    .then(userData => new UserInfo(userData))
    .catch(showError),
  userId = user.info.id,

  cardList = await api.do('GET', api.cards)
    .then(setCardsSection)
    .catch(showError),

  cardForm = new PopupWithForm ({
    handleFormSubmit: (input) => {
      api.send('POST', api.cards, () => sendCard(input))
        .then(setCardsSection)
        .then(section => section.renderItems())
        .catch(showError)
        .finally(() => cardForm.close())
      }
  }, cardFormPopup),

  userForm = new PopupWithForm({
    handleFormSubmit: (input) => {
      api.send('PATCH', api.me, sendUser.bind(this, input))
        .then(userData => new UserInfo(userData))
        .then(editedUser => {
          editedUser.setUserInfo()
          profileFormBtn.onclick = () => {
            const {name, about} = document.forms.profileForm.elements;
            userForm.open();
            name.value = editedUser.info.name;
            about.value = editedUser.info.about
          }
        })
        .catch(showError)
        .finally(() => userForm.close())
    }
  }, profileFormPopup),

  avatarForm = new PopupWithForm({
    handleFormSubmit: (input) => {
      api.send('PATCH', api.avatar, sendAvatar.bind(this, input), api.me)
        .then(userData => new UserInfo(userData))
        .then(editedAvatar=> editedAvatar.setAvatar())
        .catch(showError)
        .finally(() => avatarForm.close())
    }
  }, avatarPopup);

formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  form.enableValidation()
})

profileFormBtn.onclick = () => {
  const {name, about} = document.forms.profileForm.elements;
  userForm.open();
  name.value = user.info.name;
  about.value = user.info.about
}

avatar.onclick = () => avatarForm.open()

cardFormBtn.onclick = () => cardForm.open()

user.setUserInfo();

user.setAvatar();

cardList.renderItems();

export {api, user, userId, showError, popupWithImage, cardList}