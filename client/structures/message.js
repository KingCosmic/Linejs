const {
  // user methods
  getProfile,

  // other methods
  pushMessage
} = require('../../actions');

const User = require('./user');
const Group = require('./group');
const Room = require('./room');

class Message {
  constructor({ event, token }) {
    this.token = token;

    this.author = new User(event.source.userId);

    switch(event.message.type) {
      case 'text':
        this.content = event.message.text
        break;
    }

    switch(event.source.type) {
      case 'group':
        this.source = 'group';
        this.group = new Group({ event, token });
        break;
      case 'room':
        this.source = 'room';
        this.room = new Room({ event, token });
        break;
    }
  }

  reply(messages) {
    return pushMessage(this.token, event.source.userId)
  }
}

module.exports = Message;