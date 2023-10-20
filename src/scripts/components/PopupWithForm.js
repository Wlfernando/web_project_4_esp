import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector('.popup__container');
  }

  close() {
    super.close();
    this._form.reset();
    this._isDone()
  }

  _isDone() {
    this._form
      .querySelector('.button__submit_processing')
      .style.visibility = 'hidden'
  }

  _process() {
    this._form
      .querySelector('.button__submit_processing')
      .style.visibility = 'visible'
  }

  get _InputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__item');
    this._formValues = {};
    this._inputList.forEach(input =>
      this._formValues[input.name] = input.value);
    return this._formValues
  }

  setEventListeners() {
    const rmEventListeners = () => {
      document.removeEventListener('keydown', enableListener);
      this._popupSelector.removeEventListener('click', enableListener);
      this._popupSelector.removeEventListener('submit', enableListener)
    }

    const enableListener = e => {
      const
        clicks = ['button__close', 'popup_active'],
        isClicked = clicks.some(click=> e.target.classList.contains(click));

      if (e.key === 'Escape' || isClicked) {
        this.close();
        rmEventListeners()
      } else if (e.target.classList.contains('button__submit')) {
        this._handleFormSubmit(this._InputValues);
        rmEventListeners()
        this._process()
      }
    }

    document.addEventListener(
      'keydown', enableListener
    )

    this._popupSelector.addEventListener(
      'click', enableListener
    )

    this._popupSelector.addEventListener(
      'submit', enableListener
    )
  }
}