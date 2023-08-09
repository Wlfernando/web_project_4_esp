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
    this._me = '/web_es_07/users/me';
    this._cards = '/web_es_07/cards'
  }

  getUserData() {
    return fetch(this._baseUrl + this._me, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
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
    return fetch(this._baseUrl + this._cards, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
      },
    })
      .then(res => res.json())
  }

  postCard(input) {
    return fetch(this._baseUrl + this._cards, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType
      },
      body: JSON.stringify({
        name: input.name,
        link: input.link
      })
    })
  }

  rmCard(card) {
    return fetch(`${this._baseUrl}/web_es_07/cards/${card}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
  }
}