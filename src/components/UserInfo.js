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

  setUserInfo(name, about, avatar) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}