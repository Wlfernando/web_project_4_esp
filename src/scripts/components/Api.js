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
  }

  do(action, endPoint, id = null) {
    const url = id
      ? this._baseUrl + endPoint + '/' + id
      : this._baseUrl + endPoint;

    return fetch(url, {
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