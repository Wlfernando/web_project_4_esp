import {popUpActive} from './index.js';

export default class Card {
  constructor(item, selector){
    this._name = item.name;
    this._link = item.link;
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

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__place-name').textContent = this._name;

    return this._element
  }

  _handleOpenPopup() {
    popUpActive[2].querySelector('.popup__title-image').textContent = this._name;
    popUpActive[2].querySelector('.popup__image').src = this._link;
    popUpActive[2].querySelector('.popup__image').alt = this._name;
    popUpActive[2].classList.add("popup_active")
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