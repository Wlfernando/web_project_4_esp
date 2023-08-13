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

  // Gracias por la explicación e insistencia, espero ahora aproximarme con el resultado
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

  send(action, endPoint, sendBody, root) {
    return fetch(this._baseUrl + endPoint, {
      method: action,
      headers: {
        authorization: this._authorization,
        "content-Type": this._contentType
      },
      body: JSON.stringify(sendBody())
    })
      .then(()=> this.do('GET', root ?? endPoint))
  }
}