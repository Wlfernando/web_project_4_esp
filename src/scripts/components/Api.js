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
    this._cards = '/web_es_07/cards';
    this._avatar = '/web_es_07/users/me/avatar';
    this._likes = this._cards + '/likes/'
  }

  // hice el cambio
  _then(res) {
    if(res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}.`);
  }

  getUserData() {
    return fetch(this._baseUrl + this._me, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
      }
    })
      .then(res=> this._then(res))
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
      .then(()=> this.getUserData())
  }

  sendAvatar(data) {
    return fetch(this._baseUrl + this._avatar, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        "content-Type": this._contentType
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(()=> this.getUserData())
  }

  getCards() {
    return fetch(this._baseUrl + this._cards, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
      },
    })
      .then(res=> this._then(res))
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
      .then(()=> this.getCards())
  }

  rmCard(card) {
    return fetch(`${this._baseUrl}${this._cards}/${card}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(res=> this._then(res))
  }

  putLike(id) {
    return fetch(this._baseUrl + this._likes + id, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
      .then(res=> this._then(res))
  }

  rmLike(id) {
    return fetch(this._baseUrl + this._likes + id, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(res=> this._then(res))
  }
}