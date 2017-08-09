const express = require('express')
const line = require('@line/bot-sdk');
const middleware = line.middleware

function Client(config) {

  var that = this;

  this.app = express();

  this.client = new line.Client({
    channelAccessToken: config.channelAccessToken
  });

  this.message = []

  this.on = function(event, callback) {
    if (event == "message") this.message.push(callback);
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
  }

  this.app.use(middleware(config))

  this.app.post('/webhook', (req, res) => {

    var events = req.body.events;

    if (events.length == 1) {
      var event = events[0];

      console.log(event)

      if (event.type == "message" && event.message.type == "text") {
        // check for commands and change the response msg

        this.client.getProfile(event.source.userId)
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
                  that.client.pushMessage(profile.userId, {type: "text", text: content});
                }
              },
              group: {
                id: event.source.groupId,

                leave: function () {
                  that.client.leaveGroup(`${this.id}`);
                }

              },
              reply: function(content) {
                that.client.replyMessage(event.replyToken, {type: "text", text: content});
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
                  that.client.pushMessage(profile.userId, {type: "text", text: content});
                }
              },
              reply: function(content) {
                that.client.replyMessage(event.replyToken, {type: "text", text: content});
              }
            }
          }

          this.event("message", msg);

        })

      }

    }

  })

  this.app.listen(config.port, function() {
    console.log("ready");
  })
}

module.exports = Client;
