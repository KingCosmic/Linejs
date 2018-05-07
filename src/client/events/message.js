const Message = require('../structures/message');

module.exports = (event, token) => {
  return new Message({ event, token });
}