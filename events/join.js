
module.exports = (event, cb) => {
  if (event.source.type == "group") {
    var JoinEvent = {
      joinId: event.source.groupId,
      sendMessage: (message) => {
        if (typeof(message) == "string") {
          LineClient.pushMessage(event.source.groupId, {type: "text", text: message})
          .catch((err) => {console.log(err)});
        } else if (typeof(content) == "object") {
          LineClient.pushMessage(event.source.groupId, message)
        }
      }
    }
  } else {
    var JoinEvent = {
      joinId: event.source.roomId,
      sendMessage: (message) => {
        if (typeof(message) == "string") {
          LineClient.pushMessage(event.source.roomId, {type: "text", text: message});
        } else if (typeof(content) == "object") {
          LineClient.pushMessage(event.source.roomId, message)
        }
      }
    }
  }

  console.log(JoinEvent);
  cb(JoinEvent);
}