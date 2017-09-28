
module.exports = (event, cb) => {
  var leaveEvent = {
    leaveId: event.source.groupId,
    getMemberIds: new Promise((resolve, reject) => {
      LineClient.getGroupMemberIds(event.source.groupId)
      .then((userIds) => {
        resolve(userIds);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

  cb(leaveEvent);
}