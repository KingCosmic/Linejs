
module.exports = (event, cb) => {
  var JoinEvent
  if (event.source.type == "group") {
    JoinEvent = {
      joinId: event.source.groupId,
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
      joinId: event.source.roomId,
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