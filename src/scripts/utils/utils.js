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
        handleDeleteClick: ({ id, remove }) => {
          const dltForm = new PopupWithForm({
            handleFormSubmit: ({ close }) => {
              api.do('DELETE', api.cards, id)
                .then(remove)
                .catch(showError)
                .finally(close)
            }
          }, deleteForm)
          dltForm.open()
        },
        handleLikeClick: (e, { likes, id, confirmLike }) => {
          const
            haveLike = likes.some(like => {
              like._id ??= like.id
              return like._id  === theId
            }),
            setLikeApi = haveLike ? 'DELETE' : 'PUT',
            setLikeOnCard = haveLike
              ? likes.pop()
              : likes.push(user.info);

          api.do(setLikeApi, api.likes, id)
            .then(() => {
              setLikeOnCard;
              confirmLike(e);
            })
            .catch(showError)
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