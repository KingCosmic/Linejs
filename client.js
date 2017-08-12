const express = require('express')
const line = require('@line/bot-sdk');
const middleware = line.middleware

function Client(config) {

  var that = this;

  this.app = express();

  this.client = new line.Client({
    channelAccessToken: config.channelAccessToken
  });

  that.client.getProfile(config.userId)
  .then((profile) => {

    that.user = {
      displayName: profile.displayName,
      id: profile.userId,
      pictureUrl: profile.pictureUrl,
      statusMessage: profile.statusMessage
    }
  })

  this.message = []
  this.join = []

  this.on = function(event, callback) {
    if (event == "message") this.message.push(callback);

    if (event == "join") this.join.push(callback);
  }

  this.event = function(event) {

    var args = Array.from(arguments);

    args.splice(0, 1);

    if (event == "message") {
      if (this.message.length != 0) {
        this.message.forEach(function(callback) {
          callback.apply(null, args)
        });
      }
    }
    if (event == "join") {
      if (this.join.length != 0) {
        this.join.forEach(function(callback) {
          callback.apply(null, args)
        });
      }
    }
  }

  this.app.use(middleware(config))

  this.app.post('/', (req, res) => {

    var events = req.body.events;

    events.forEach(function(event) {
      if (event.type == "message" && event.message.type == "text") {
        // check for commands and change the response msg

        that.client.getProfile(event.source.userId)
        .then((profile) => {

          var msg;

          if (event.source.type == "group") {
            msg = {
              content: event.message.text,  // the message content
              author: {
                displayName: profile.displayName,
                id: profile.userId,
                pictureUrl: profile.pictureUrl,
                statusMessage: profile.statusMessage,
                sendMessage: function(content) {
                  if (typeof(content) == "string") {
                    that.client.pushMessage(profile.userId, {type: "text", text: content});
                  } else if (typeof(content) == "object") {
                    that.client.pushMessage(profile.userId, content);
                  }
                }
              },
              group: {
                id: event.source.groupId,

                leave: function () {
                  that.client.leaveGroup(`${this.id}`);
                }

              },
              reply: function(content) {
                if (typeof(content) == "string") {
                  that.client.replyMessage(event.replyToken, {type: "text", text: content});
                } else if (typeof(content) == "object") {
                  that.client.replyMessage(event.replyToken, content);
                }
              }
            }
          } else {
            msg = {
              content: event.message.text,  // the message content
              author: {
                displayName: profile.displayName,
                id: profile.userId,
                pictureUrl: profile.pictureUrl,
                statusMessage: profile.statusMessage,
                sendMessage: function(content) {
                  if (typeof(content) == "string") {
                    that.client.pushMessage(profile.userId, {type: "text", text: content});
                  } else if (typeof(content) == "object") {
                    that.client.pushMessage(profile.userId, content);
                  }
                }
              },
              reply: function(content) {
                if (typeof(content) == "string") {
                  that.client.replyMessage(event.replyToken, {type: "text", text: content});
                } else if (typeof(content) == "object") {
                  that.client.replyMessage(event.replyToken, content);
                }
              }
            }
          }

          that.event("message", msg);

        })

      }
      if (event.type == "join") {
        that.event("join", event);
      }
      if (event.type == "follow") {
        this.client.getProfile(event.source.userId)
        .then((profile) => {
          var user = {
            displayName: profile.displayName,
            id: profile.userId,
            pictureUrl: profile.pictureUrl,
            statusMessage: profile.statusMessage,
            sendMessage: function(content) {
              if (typeof(content) == "string") {
                that.client.pushMessage(profile.userId, {type: "text", text: content});
              } else if (typeof(content) == "object") {
                that.client.pushMessage(profile.userId, content);
              }
            }
          }
        })
      }
      if (event.type == "unfollow") {
        this.client.getProfile(event.source.userId)
        .then((profile) => {
          var user = {
            displayName: profile.displayName,
            id: profile.userId,
            pictureUrl: profile.pictureUrl,
            statusMessage: profile.statusMessage,
            sendMessage: function(content) {
              if (typeof(content) == "string") {
                that.client.pushMessage(profile.userId, {type: "text", text: content});
              } else if (typeof(content) == "object") {
                that.client.pushMessage(profile.userId, content);
              }
            }
          }
        })
      }
    })

  })



  this.app.listen(config.port, function() {
    console.log("ready");
  })
}

module.exports = Client;
