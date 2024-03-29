import{
  formConfig, profileFormBtn,
  profileFormPopup, cardFormPopup, cardFormBtn, displayCard,
  avatarPopup, avatar, errorPopup
} from "./scripts/utils/constants.js";
import{ setCardsSection, setUserFields } from './scripts/utils/utils.js';
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import PopupWithError from './scripts/components/PopupWithError.js';
import UserInfo from "./scripts/components/UserInfo.js";
import FormValidator from "./scripts/components/FormValidator.js";
import './pages/index.css';
import Api from './scripts/components/Api.js';

const
  api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1",
    headers: {
      authorization: "4f0ec2d8-0a82-401b-be94-8d93fd8bc4fc",
      "Content-Type": "application/json"
    }
  }),

  errorMessage = new PopupWithError(errorPopup),
  showError = errorMessage.open.bind(errorMessage),

  popupWithImage = new PopupWithImage(displayCard),

  user = await api.do('GET', api.me)
    .then(userData => new UserInfo(userData))
    .catch(showError),

  cardForm = new PopupWithForm ({
    handleFormSubmit: ({ input, close }) => {
      api.send('POST', api.cards, input)
        .then(setCardsSection)
        .then(cardsSection => cardsSection.renderItems())
        .catch(showError)
        .finally(close)
      }
  }, cardFormPopup),

  userForm = new PopupWithForm({
    handleFormSubmit: ({ input, close }) => {
      api.send('PATCH', api.me, input)
        .then(userData => new UserInfo(userData))
        .then(editedUser => {
          editedUser.setUserInfo();
          profileFormBtn.onclick = () => setUserFields(editedUser);
        })
        .catch(showError)
        .finally(close)
    }
  }, profileFormPopup),

  avatarForm = new PopupWithForm({
    handleFormSubmit: ({ input, close }) => {
      api.send('PATCH', api.avatar, input, api.me)
        .then(userData => new UserInfo(userData))
        .then(editedAvatar => editedAvatar.setAvatar())
        .catch(showError)
        .finally(close)
    }
  }, avatarPopup),

  validation = new FormValidator(formConfig);

validation.enableValidation()

api.do('GET', api.cards)
  .then(setCardsSection)
  .then(cardsSection => cardsSection.renderItems())
  .catch(showError)

profileFormBtn.onclick = () => setUserFields(user);

avatar.onclick = () => avatarForm.open();

cardFormBtn.onclick = () => cardForm.open();

user.setUserInfo();
user.setAvatar();

export { api, user, showError, popupWithImage, userForm }