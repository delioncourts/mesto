class Api {
    constructor({ baseUrl, headers }) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
  
    getProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
        .catch(console.log);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
        .catch(console.log);
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
        .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
        .catch(console.log);
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
          .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
          .catch(console.log);
      }

      deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
          method: "DELETE",
          headers: this._headers,
        })
          .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
          .catch(console.log);
      }

      deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
          .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
          .catch(console.log);
      }

      addLike() {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers
        })
          .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
          .catch(console.log);
      }

  }
  
 export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
      authorization: 'a0b3e2e0-8bf7-47b3-9f51-e543921e1ae3',
      'Content-Type': 'application/json'
    }
  }); 