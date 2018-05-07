const { roomMemberIds } = require('../urls');
const { get } = require('../http');

const { checkJSON } = require('../helpers');

module.exports = (token, roomId) => {
  return load(token, roomIds);
}

const load = (token, roomId, start) => 
  get(token, roomMemberIds(roomId, start))
    .then(checkJSON)
    .then((res) => {
      if (!res.next) return res.memberIds;

      return load(token, roomId, res.next).then(extraIds =>
        res.memberIds.concat(extraIds)
      )
    })