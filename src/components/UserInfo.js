export class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector }) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._jobElement = document.querySelector(profileDescriptionSelector);
    this._avatarElement = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent
    }
  }

  setUserInfo(nameInput, jobInput, avatarInput) {
    this._nameElement.textContent = nameInput;
    this._jobElement.textContent = jobInput;
    this._avatarElement.src = avatarInput;
}
}