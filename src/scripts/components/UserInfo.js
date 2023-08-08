export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = name;
    this._job = about
    this._avatar = avatar
  }

  getUserInfo() {
    return {name: this._name, about: this._job, avatar: this._avatar}
  }

  setUserInfo() {
    document.querySelector('.profile__user-name').textContent = this._name;
    document.querySelector('.profile__about-me').textContent = this._job;
  }

  setAvatar() {
    document.querySelector('.profile__avatar').style.backgroundImage = `url(${this._avatar})`
  }
}