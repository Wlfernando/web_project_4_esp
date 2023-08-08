export default class Card {
  constructor({data, handleOpenClick, handleDeleteClick}, selector){
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._handleOpenClick = handleOpenClick;
    this._handleDeleteClick = handleDeleteClick;
    this._selector = selector
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._selector).content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement
  }

  renderCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.card__place-name').textContent = this._name;
    this._showNumberLikes()

    return this._element
  }

  _showNumberLikes() {
    this._element.querySelector('.card__likes-count').textContent = this._likes.length || undefined
  }

  _handleLikeBtn(e) {
    e.target.classList.toggle('card__like-button_active')
  }

  _handleRmBtn() {
    // this._element.closest('.card').remove()
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__image')
      .addEventListener('click', () => this._handleOpenClick(
        this._name, this._link)
      )

    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', e => this._handleLikeBtn(e))

    this._element
      .querySelector('.card__trash-button')
      .addEventListener('click', () => this._handleDeleteClick())
  }
}