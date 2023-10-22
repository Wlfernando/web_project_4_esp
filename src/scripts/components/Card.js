export default class Card {
  constructor({data, handleOpenClick, handleDeleteClick, handleLikeClick}, selector){
    this._selector = selector
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._id = data._id;
    this._handleOpenClick = handleOpenClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  get _template() {
    const cardTemplate = document.querySelector(this._selector).content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement
  }

  get Id() {
    return this._id
  }

  renderCard(id) {
    this._element = this._template;
    
    const cardImage = this._element.querySelector('.card__image');

    this._setEventListeners();
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector('.card__place-name').textContent = this._name;
    this._verification = id
    this._numberOfLikes

    return this._element
  }

  set _verification(id) {
    this._dustbin = id
    this._like = id
  }

  set _dustbin(id) {
    if (this._owner._id !== id)
    this._element
      .querySelector('.card__trash-button')
      .style
      .visibility = "hidden"
  }

  set _like(id) {
    if (this._likes.some(like => like._id === id))
    this._element
      .querySelector('.card__like-button')
      .classList
      .add('card__like-button_active')
  }

  get _numberOfLikes() {
    this._element
      .querySelector('.card__likes-count')
      .textContent = this._likes.length || undefined
  }

  _handleLikeBtn(e) {
    e.target.classList.toggle('card__like-button_active')
    this._handleLikeClick(this._likes, this._id)
    this._numberOfLikes
  }

  get remover() {
    this._element.closest('.card').remove()
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__image')
      .addEventListener(
        'click',
        this._handleOpenClick.bind(this, this._name, this._link)
      )

    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', this._handleLikeBtn.bind(this))

    this._element
      .querySelector('.card__trash-button')
      .addEventListener(
        'click',
        this._handleDeleteClick.bind(this, this))
  }
}