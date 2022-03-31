class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(this._checkServerResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(this._checkServerResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then(this._checkServerResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
    .then(this._checkServerResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkServerResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._checkServerResponse);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkServerResponse);
  }
  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
    .then(this._checkServerResponse);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-37",
  headers: {
    authorization: "a0b3e2e0-8bf7-47b3-9f51-e543921e1ae3",
    "Content-Type": "application/json",
  },
});