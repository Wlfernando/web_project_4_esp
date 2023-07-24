export default class Card {
  constructor({data, handleCardClick}, selector){
    this._name = data.name;
    this._link = data.link;
    this._handleOpenClick = handleCardClick;
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

    return this._element
  }

  _handleLikeBtn(e) {
    e.target.classList.toggle('card__like-button_active')
  }

  _handleRmBtn() {
    this._element.closest('.card').remove()
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
      .addEventListener('click', () => this._handleRmBtn())
  }
}