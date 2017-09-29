
module.exports = (event, cb) => {
  LineClient.getProfile(event.source.userId)
  .then((profile) => {

    if (event.message.type == "text") {
      var message = {
        content: event.message.text,  // the message content
        author: {
          username: profile.displayName,
          id: profile.userId,
          pictureUrl: profile.pictureUrl,
          statusMessage: profile.statusMessage,
          sendMessage: (content) => {
            if (typeof(content) == "string") {
              LineClient.pushMessage(profile.userId, {type: "text", text: content});
            } else if (typeof(content) == "object") {
              LineClient.pushMessage(profile.userId, content);
            }
          }
        },
        reply: (content) => {
          if (typeof(content) == "string") {
            LineClient.replyMessage(event.replyToken, {type: "text", text: content});
          } else if (typeof(content) == "object") {
            LineClient.replyMessage(event.replyToken, content);
          }
        }
      }
    }

    if (event.source.type == "group") {
      var group = {
        group: {
          id: event.source.groupId,
          sendMessage: (content) => {
            if (typeof(content) == "string") {
              LineClient.pushMessage(event.source.groupId, {type: "text", text: content});
            } else if (typeof(content) == "object") {
              LineClient.pushMessage(event.source.groupId, content);
            }
          },
          leave: () => {
            LineClient.leaveGroup(event.source.groupId);
          }
        }
      }

      message = Object.assign(message, group);
    } else if (event.source.type == "room") {
      var room = {
        room: {
          id: event.source.roomId,
          sendMessage: (content) => {
            if (typeof(content) == "string") {
              LineClient.pushMessage(event.source.roomId, {type: "text", text: content});
            } else if (typeof(content) == "object") {
              LineClient.pushMessage(event.source.roomId, content);
            }
          },
          leave: () => {
            LineClient.leaveGroup(event.source.roomId);
          }
        }
      }

      message = Object.assign(message, room);
    }

    cb(message);

  })
}