const { groupMemberProfile } = require('../urls');
const { get } = require('../http');

const { checkJSON } = require('../helpers');

module.exports = (token, groupId, userId) => {
  return get(token, groupMemberProfile(groupId, userId)).then(checkJSON);
}