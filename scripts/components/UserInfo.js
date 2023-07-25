export default class UserInfo {
  constructor({profileName, aboutMe}) {
    this._profileName = profileName;
    this._aboutMe = aboutMe
  }

  getUserInfo() {
    return {name: this._profileName, job: this._aboutMe}
  }

  setUserInfo() {
    document.querySelector('.profile__user-name').textContent = this._profileName;
    document.querySelector('.profile__about-me').textContent = this._aboutMe;
  }
}