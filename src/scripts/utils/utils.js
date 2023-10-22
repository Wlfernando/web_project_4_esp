import { api, user, theId, showError, popupWithImage, userForm } from '../../index.js'
import { deleteForm, cardTemplate, cardsContainer } from './constants.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js'

function setCardsSection(items) {
  return new Section ({
    data: items,
    renderer: (thatSection, data) => {
      const card = new Card({
        data,
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
            return like._id  === theId
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
      }, cardTemplate);

      thatSection.addItem(card.renderCard(theId));
    }
  }, cardsContainer)
}

function setUserFields(anUser) {
  const
    {name, about} = document.forms.profileForm.elements,
    {name: aName, about: anAbout} = anUser.info;

  userForm.open();
  name.value = aName;
  about.value = anAbout;
}

export { setCardsSection, setUserFields };