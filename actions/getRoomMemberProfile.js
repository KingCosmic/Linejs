const { roomMemberProfile } = require('../urls');
const { get } = require('../http');

const { checkJSON } = require('../helpers');

module.exports = (token, roomId, userId) => {
  return get(token, roomMemberProfile(roomId, userId)).then(checkJSON);
}