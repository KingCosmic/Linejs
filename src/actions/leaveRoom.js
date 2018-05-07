const { leaveRoom } = require('../urls');
const { post } = require('../http');

module.exports = (token, roomId) => {
  return post(token, leaveGroup(roomId));
}