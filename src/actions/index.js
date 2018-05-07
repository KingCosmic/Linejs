// messaging
const pushMessage = require('./pushMessage');
const replyMessage = require('./replyMessage');
const multicast = require('./multicast');

// users
const getProfile = require('./getProfile');

// groups
const getGroupMemberIds = require('./getGroupMemberIds');
const getGroupMemberProfile = require('./getGroupMemberProfile');
const leaveGroup = require('./leaveGroup');

// rooms
const getRoomMemberIds = require('./getRoomMemberIds');
const getRoomMemberProfile = require('./getRoomMemberProfile');
const leaveRoom = require('./leaveRoom');

module.exports = {
  pushMessage,
  replyMessage,
  multicast,

  getProfile,

  getGroupMemberIds,
  getGroupMemberProfile,
  leaveGroup,

  getRoomMemberIds,
  getRoomMemberProfile,
  leaveRoom
}