export default class UserInfo {
  constructor({profileName, aboutMe}) {
    this._name = profileName;
    this._job = aboutMe
  }

  getUserInfo() {
    return {nameUser: this._name, jobUser: this._job}
  }

  setUserInfo() {
    document.querySelector('.profile__user-name').textContent = this._name;
    document.querySelector('.profile__about-me').textContent = this._job;
  }
}