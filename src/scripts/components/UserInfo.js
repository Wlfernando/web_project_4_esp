export default class UserInfo {
  constructor({name, about, avatar, _id, cohort}) {
    this._name = name;
    this._job = about;
    this._avatar = avatar;
    this._id = _id;
    this._group = cohort
  }

  get info() {
    return {
      name: this._name,
      about: this._job,
      avatar: this._avatar,
      id: this._id,
      group: this._group
    }
  }

  setUserInfo() {
    document.querySelector('.profile__user-name').textContent = this._name;
    document.querySelector('.profile__about-me').textContent = this._job;
  }

  setAvatar() {
    document.querySelector('.profile__avatar').style.backgroundImage = `url(${this._avatar})`
  }
}