const {
  // user methods
  getProfile,

  // other methods
  pushMessage
} = require('../../actions');

class User {
  constructor({ id, token }) {
    this.id = id;
    this.token = token;
  }

  getProfile() {
    return getProfile(this.token, this.id);
  }

  send(messages) {
    return pushMessage(this.token, this.id)
  }
}

module.exports = User;