import { api, user, userId, showError, popupWithImage } from '../../index.js'
import { deleteForm, cardTemplate, cardsContainer } from './constants.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js'

function sendCard(data) {
  return {
    name: data.name,
    link: data.link
  }
}

function sendUser(data) {
  return {
    name: data.name,
    about: data.about
  }
}

function sendAvatar(data) {
  return { avatar: data.avatar }
}

function setCardsSection(items) {
  return new Section ({
    data: items,
    renderer: (singleItem) => {
      const
        card = new Card({
          data: singleItem,
          handleOpenClick: popupWithImage.open.bind(popupWithImage),
          handleDeleteClick: (id) => {
            const dltForm = new PopupWithForm({
              handleFormSubmit: () => {
                api.do('DELETE', api.cards, id)
                  .then(() => card.remover)
                  .catch(showError)
                  .finally(() => dltForm.close())
              }
            }, deleteForm)
            dltForm.open()
          },
          handleLikeClick: (likes, id) => {
            const haveLike = likes.some(like => {
              like._id ??= like.id
              return like._id  === userId
            })

            if (haveLike) {
              api.do('DELETE', api.likes, id)
                .then(likes.pop())
                .catch(showError)
            } else {
              api.do('PUT', api.likes, id)
                .then(likes.push(user.info))
                .catch(showError)
            }
          }
        }, cardTemplate),
        cardElement = card.renderCard();

      card.verification = userId
      return cardElement
    }
  }, cardsContainer)
}

export { sendCard, sendUser, sendAvatar, setCardsSection };