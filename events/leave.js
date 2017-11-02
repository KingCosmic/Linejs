
module.exports = (event, cb) => {
  var leaveEvent = {
    id: event.source.groupId
  }

  cb(leaveEvent);
}