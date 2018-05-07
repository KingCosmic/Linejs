const Group = require('../structures/group');
const Room = require('../structures/room');

module.exports = (event) => {
  switch(event.source.type) {
    case 'group':
      return new Group(event);
    case 'room':
      return new Room(event);
    default:
      break;
  }
}