const Group = require('../structures/group');
const Room = require('../structures/room');

module.exports = (event, token) => {
  switch(event.source.type) {
    case 'group':
      return new Group({ event, token });
    case 'room':
      return new Room({ event, token });
    default:
      break;
  }
}