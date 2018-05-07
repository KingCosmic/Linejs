const Message = require('../structures/message');

module.exports = (event) => {
  return new Message(event);
}