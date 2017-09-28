
module.exports = (event, LineClient, cb) => {
  var JoinEvent = {
    joinId: event.source.type == "group" ? event.source.groupId : event.source.roomId,
    getMemberIds: new Promise((resolve, reject) => {
      if (event.source.type == "group") {
        LineClient.getGroupMemberIds(event.source.groupId)
        .then((userIds) => {
          resolve(userIds);
        })
        .catch((err) => {
          reject(err);
        })
      } else {
        LineClient.getRoomMemberIds(event.source.roomId)
        .then((userIds) => {
          resolve(userIds);
        })
        .catch((err) => {
          reject(err);
        })
      }
    }),
    sendMessage: (message) => {
      if (typeof(message) == "string") {
        LineClient.replyMessage(event.replyToken, {type: "text", text: message});
      } else if (typeof(content) == "object") {
        LineClient.replyMessage(event.replyToken, message)
      }
    }
  }

  cb(JoinEvent);
}