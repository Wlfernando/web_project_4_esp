export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._contentType = headers['Content-Type'];
  }

  me = '/web_es_07/users/me';
  cards = '/web_es_07/cards';
  avatar = this.me + '/avatar';
  likes = this.cards + '/likes';

  do(action, endPoint, id = null) {
    const anUrl = id
      ? this._baseUrl + endPoint + '/' + id
      : this._baseUrl + endPoint;

    return fetch(anUrl, {
      method: action,
      headers: {
        authorization: this._authorization
      }
    })
      .then(res=> {
        if(res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}.`);
      })
  }

  send(action, endPoint, input, root = undefined) {
    return fetch(this._baseUrl + endPoint, {
      method: action,
      headers: {
        authorization: this._authorization,
        "content-Type": this._contentType
      },
      body: JSON.stringify(input)
    })
      .then(()=> this.do('GET', root ?? endPoint))
  }
}