
module.exports = (event, cb) => {
  var leaveEvent = {
    leaveId: event.source.groupId
  }

  cb(leaveEvent);
}