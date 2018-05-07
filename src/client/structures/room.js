const {
  // room methods
  getRoomMemberIds, getRoomMemberProfile, leaveRoom,

  // other methods
  pushMessage
} = require('../../actions');

class Room {
  constructor({ event, token }) {
    this.token = token;
    this.id = event.source.roomId;
  }

  getMemberProfile(userId) {
    return getRoomMemberProfile(this.token, userId);
  }

  getMemberIds() {
    return getRoomMemberIds(this.token, this.id)
  }

  send(messages) {
    return pushMessage(this.token, this.id, messages);
  }

  leave() {
    return leaveRoom(this.token, this.id);
  }
}

module.exports = Room;