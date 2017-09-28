
module.exports = (event, LineClient, cb) => {
  if (event.source.type == "group") {
    var JoinEvent = {
      joinId: event.source.groupId,
      getMemberIds: new Promise((resolve, reject) => {
        LineClient.getGroupMemberIds(event.source.groupId)
        .then((userIds) => {
          resolve(userIds);
        })
        .catch((err) => {
          reject(err);
        })
      }),
      sendMessage: (message) => {
        if (typeof(message) == "string") {
          LineClient.pushMessage(event.source.groupId, {type: "text", text: message});
        } else if (typeof(content) == "object") {
          LineClient.pushMessage(event.source.groupId, message)
        }
      }
    }
  } else {
    var JoinEvent = {
      joinId: event.source.roomId,
      getMemberIds: new Promise((resolve, reject) => {
        LineClient.getRoomMemberIds(event.source.roomId)
        .then((userIds) => {
          resolve(userIds);
        })
        .catch((err) => {
          reject(err);
        })
      }),
      sendMessage: (message) => {
        if (typeof(message) == "string") {
          LineClient.pushMessage(event.source.roomId, {type: "text", text: message});
        } else if (typeof(content) == "object") {
          LineClient.pushMessage(event.source.roomId, message)
        }
      }
    }
  }

  cb(JoinEvent);
}