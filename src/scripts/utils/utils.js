import { api, user, showError, popupWithImage, userForm } from '../../index.js'
import { deleteForm, cardTemplate, cardsContainer } from './constants.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import PopupWithForm from '../components/PopupWithForm.js'

function setCardsSection(items) {
  const theId = user.info.id;
  
  return new Section ({
    data: items,
    renderer: (thatSection, data) => {
      const card = new Card({
        data,
        handleOpenClick: popupWithImage.open.bind(popupWithImage),
        handleDeleteClick: ({ id, remove }) => {
          new PopupWithForm({
            handleFormSubmit: ({ close }) => {
              api.do('DELETE', api.cards, id)
                .then(remove)
                .catch(showError)
                .finally(close)
            }
          }, deleteForm).open()
        },
        handleLikeClick: (e, { likes, id, confirmLike }) => {
          const
            index = likes.findIndex((like) => (like._id ?? like.id) === theId),
            haveLike = -1 < index,
            setLikeOnApi = haveLike ? 'DELETE' : 'PUT',
            setLikeOnCard = haveLike
              ? likes.splice(index, 1)
              : likes.push(user.info);

          api.do(setLikeOnApi, api.likes, id)
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