const { leaveGroup } = require('../urls');
const { post } = require('../http');

module.exports = (token, groupId) => {
  return post(token, leaveGroup(groupId));
}