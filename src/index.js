import{
  cardsContainer, formList, formConfig, profileFormBtn, deleteForm,
  profileFormPopup, cardFormPopup, cardFormBtn, displayCard, cardTemplate,
  avatarPopup, avatar, errorPopup
} from "./scripts/utils/constants.js";
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

const errorMessage = new PopupWithError(errorPopup)
const popupWithImage = new PopupWithImage(displayCard);

api.getUserData()
  .then(userData => {
    const user = new UserInfo(userData);

    api.getCards()
      .then(cards => {
        const waitingApi = 250;
        const cardList = new Section ({
          data: cards,
          renderer: (item) => {
            const card = new Card({
              data: item,
              handleOpenClick: (name, link)=> {
                popupWithImage.open(name, link)
              },
              handleDeleteClick: (id) => {
                const dltForm = new PopupWithForm({
                  handleFormSubmit: () => {
                    api.rmCard(id)
                      .then(card.handleRemover())
                      .catch(err=> errorMessage.open(err))
                      .finally(()=>
                        setTimeout(dltForm.close(), waitingApi)
                      )
                  }
                }, deleteForm)
                dltForm.open()
              },
              handleLikeClick: (likes, id) => {
                if(!likes.find(like => like._id === userData._id)) {
                  api.putLike(id)
                    .then(likes.push(userData))
                    .catch(err=> errorMessage.open(err))
                } else {
                  api.rmLike(id)
                    .then(likes.pop())
                    .catch(err=> errorMessage.open(err))
                }
              }
            }, cardTemplate);
            const cardElement = card.renderCard();
            card.isVerified(userData)
            cardList.addItem(cardElement)
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
                      handleDeleteClick: (id) => {
                        const dltForm = new PopupWithForm({
                          handleFormSubmit: () => {
                            api.rmCard(id)
                              .then(card.handleRemover())
                              .catch(err=> errorMessage.open(err))
                              .finally(()=>
                                setTimeout(dltForm.close(), waitingApi)
                              )
                          }
                        }, deleteForm)
                        dltForm.open()
                      },
                      handleLikeClick: (likes, id) => {
                        if(!likes.find(like => like._id === userData._id)) {
                          api.putLike(id)
                            .then(likes.push(userData))
                            .catch(err=> errorMessage.open(err))
                        } else {
                          api.rmLike(id)
                            .then(likes.pop())
                            .catch(err=> errorMessage.open(err))
                        }
                      }
                    }, cardTemplate)
                    const cardElement = card.renderCard();
                    cardList.addItem(cardElement, 'prepend')
                  })
                  .catch(err => errorMessage.open(err))
                  .finally(userCardForm.close())
              })
                .catch(err=> errorMessage.open(err))
          }
        }, cardFormPopup)

        profileFormBtn.onclick = () => {
          const {name, about} = document.forms.profileForm.elements;
          userInfoForm.open();
          name.value = user.getUserInfo().name;
          about.value = user.getUserInfo().about
        }

        avatar.onclick = () => avatarForm.open()

        cardFormBtn.onclick = () => userCardForm.open()

        user.setUserInfo();
        user.setAvatar();
      })
      .catch(err => errorMessage.open(err))
  })
  .catch(err => errorMessage.open(err))

const userInfoForm = new PopupWithForm({
  handleFormSubmit: (input) => {
    api.sendUserForm(input)
      .then(() => {
        api.getUserData()
          .then(userData=> {
            const editedUser = new UserInfo(userData)
            editedUser.setUserInfo()
            profileFormBtn.onclick = () => {
              const {name, about} = document.forms.profileForm.elements;
              userInfoForm.open();
              name.value = editedUser.getUserInfo().name;
              about.value = editedUser.getUserInfo().about
            }
          })
          .catch(err => errorMessage.open(err))
          .finally(userInfoForm.close())

      })
      .catch(err=> errorMessage.open(err))
  }
}, profileFormPopup)

const avatarForm = new PopupWithForm({
  handleFormSubmit: (input) => {
    api.sendAvatar(input)
      .then(() => {
        api.getUserData()
          .then(userData=> {
            const editedAvatar = new UserInfo(userData)
            editedAvatar.setAvatar()
        })
          .catch(err=> errorMessage.open(err))
          .finally(avatarForm.close())
      })
  }
}, avatarPopup)

formList.forEach(formElement => {
  const form = new FormValidator(formConfig, formElement);
  form.enableValidation()
})