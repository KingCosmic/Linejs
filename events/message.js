
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
              return LineClient.replyMessage(profile.userId, {type: "text", text: content})
              .catch((err) => {
                console.log(err);
              })
            } else {
              return LineClient.replyMessage(profile.userId, content)
              .catch((err) => {
                console.log(err);
              })
            }
          }
        },
        reply: (content) => {
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

    if (event.source.type == "group") {
      var group = {
        group: {
          id: event.source.groupId,
          sendMessage: (content) => {
            if (typeof(content) == "string") {
              return LineClient.pushMessage(event.source.groupId, {type: "text", text: content});
            } else {
              return LineClient.pushMessage(event.source.groupId, content);
            }
          },
          leave: () => {
            return LineClient.leaveGroup(event.source.groupId);
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
              return LineClient.pushMessage(event.source.roomId, {type: "text", text: content});
            } else {
              return LineClient.pushMessage(event.source.roomId, content);
            }
          },
          leave: () => {
            return LineClient.leaveGroup(event.source.roomId);
          }
        }
      }

      message = Object.assign(message, room);
    }

    cb(message);

  })
}