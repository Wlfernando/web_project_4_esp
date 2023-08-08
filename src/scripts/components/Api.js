export default class Api {
  constructor({
    baseUrl,
    headers: {
      authorization,
      ["Content-Type"]: ContentType
    }
  }) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
    this._contentType = ContentType;
    this._me = '/web_es_07/users/me'
  }

  getUserData() {
    return fetch(this._baseUrl + this._me, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType
      }
    })
    .then(res=> res.json())
  }

  sendUserForm(data) {
    return fetch(this._baseUrl + this._me, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        "content-Type": this._contentType
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/web_es_07/cards', {
      method: 'GET',
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType
      },
    })
      .then(res => res.json())
  }
}