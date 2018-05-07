const { groupMemberIds } = require('../urls');
const { get } = require('../http');

const { checkJSON } = require('../helpers');

module.exports = (token, groupId) => {
  return load(token, groupId);
}

const load = (token, groupId, start) => 
  get(token, groupMemberIds(groupId, start))
    .then(checkJSON)
    .then((res) => {
      if (!res.next) return res.memberIds;

      return load(token, groupId, res.next).then(extraIds =>
        res.memberIds.concat(extraIds)
      )
    })