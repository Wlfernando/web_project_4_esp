import {displayCard} from '../utils/constants.js';

export default class Card {
  constructor({name, link}, selector){
    this._name = name;
    this._link = link;
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

  _handleOpenPopup() {
    const displayCardImage = displayCard.querySelector('.popup__image');

    displayCard.querySelector('.popup__title-image').textContent = this._name;
    displayCardImage.src = this._link;
    displayCardImage.alt = this._name;
    displayCard.classList.add("popup_active")
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
      .addEventListener('click', () => this._handleOpenPopup());

    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', (e) => this._handleLikeBtn(e));

    this._element
      .querySelector('.card__trash-button')
      .addEventListener('click', () => this._handleRmBtn())
  }
}