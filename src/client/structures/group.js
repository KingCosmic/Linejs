const {
  // group methods
  getGroupMemberIds, getGroupMemberProfile, leaveGroup,

  // other methods
  pushMessage
} = require('../../actions');

class Group {
  constructor({ event, token }) {
    this.token = token;
    this.id = event.source.groupId;
  }

  getMemberProfile(userId) {
    return getGroupMemberProfile(this.token, userId);
  }

  getMemberIds() {
    return getGroupMemberIds(this.token, this.id)
  }

  send(messages) {
    return pushMessage(this.token, this.id, messages);
  }

  leave() {
    return leaveGroup(this.token, this.id);
  }
}

module.exports = Group;