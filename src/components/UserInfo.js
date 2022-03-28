export class UserInfo {
    constructor({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector }) {
      this._nameElement = document.querySelector(profileNameSelector);
      this._jobElement = document.querySelector(profileDescriptionSelector);
      this._profileAvatarSelector = document.querySelector(profileAvatarSelector);
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        job: this._jobElement.textContent
      };
    }
  
    setUserInfo(name, job) {
      this._nameElement.textContent = name;
      this._jobElement.textContent = job;
    }

    setUserAvatar(avatar) {
      this._profileAvatarSelector.src = avatar;
    }
  }