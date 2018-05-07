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

    this.author = new User({ id: event.source.userId, token });
    this.source = 'user';

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
    switch(this.source) {
      case 'user':
        return pushMessage(this.token, this.author.id, messages);
      case 'group':
        return pushMessage(this.token, this.group.id, messages);
      case 'room':
        return pushMessage(this.token, this.room.id, messages);
    }
  }
}

module.exports = Message;