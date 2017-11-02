
module.exports = (event, cb) => {
  var JoinEvent
  if (event.source.type == "group") {
    JoinEvent = {
      id: event.source.groupId,
      getGroupMemberIds: () => {
        return LineClient.getGroupMemberIds(event.source.groupId)
        .catch((err) => {
          console.log(err);
        })
      },
      sendMessage: (content) => {
        if (typeof(content) == "string") {
          return LineClient.replyMessage(event.replyToken, {type: "text", text: content})
          .catch((err) => {
            console.log(err);
          })
        } else {
          return LineClient.replyMessage(event.replyToken, content)
          .catch((err) => {
            console.log(err);
          })
        }
      }
    }
  } else {
    JoinEvent = {
      id: event.source.roomId,
      sendMessage: (content) => {
        if (typeof(content) == "string") {
          return LineClient.replyMessage(event.replyToken, {type: "text", text: content})
          .catch((err) => {
            console.log(err);
          })
        } else {
          return LineClient.replyMessage(event.replyToken, content)
          .catch((err) => {
            console.log(err);
          })
        }
      }
    }
  }

  cb(JoinEvent);
}