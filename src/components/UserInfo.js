export class UserInfo {
    constructor({ profileNameSelector, profileDescriptionSelector }) {
      this._nameElement = document.querySelector(profileNameSelector);
      this._jobElement = document.querySelector(
        profileDescriptionSelector
      );
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      };
    }
  
    setUserInfo(name, job) {
      this._nameElement.textContent = name;
      this._jobElement = job;
    }
  }