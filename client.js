// express so we can setup our server for real time events
const express = require('express');
// the line sdk to make working with their api easier
const line = require('@line/bot-sdk');
// middleware for express
const middleware = line.middleware

// Our client Object
function Client(config) {

  // doing this so we can store things appropriatly in other functions
  var that = this;

  // Initialize express
  this.app = express();

  // Making a client with the line sdk so we can send msgs
  this.client = new line.Client({
    channelAccessToken: config.channelAccessToken
  });

  this.sendMessage = (user, content) => {
    that.client.pushMessage(user, {type: "text", text: content});
  }

  // the event arrays ( may be a nicer way to do this)
  this.message = []
  this.join = []

  // function to let the users setup event callbacks
  this.on = (event, callback) => {
    if (event == "message") this.message.push(callback);

    if (event == "join") this.join.push(callback);
  }

  // a function to call the event with the arguments
  this.event = function(event) {

    var args = Array.from(arguments);

    // remove the event name from the arguments passed
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

  // setting up express to use lines middleware
  this.app.use(middleware(config))

  // setting up our code to determin what events we have
  this.app.post('/', (req, res) => {

    var events = req.body.events;

    events.forEach(function(event) {
      if (event.type == "message" && event.message.type == "text") {

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
                sendMessage: (content) => {
                  if (typeof(content) == "string") {
                    that.client.pushMessage(profile.userId, {type: "text", text: content});
                  } else if (typeof(content) == "object") {
                    that.client.pushMessage(profile.userId, content);
                  }
                }
              },
              group: {
                id: event.source.groupId,
                sendMessage: (content) => {
                  that.client.pushMessage(this.id, {type: "text", text: content})
                },
                leave: () => {
                  that.client.leaveGroup(this.id);
                }

              },
              reply: (content) => {
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
                sendMessage: (content) => {
                  if (typeof(content) == "string") {
                    that.client.pushMessage(profile.userId, {type: "text", text: content});
                  } else if (typeof(content) == "object") {
                    that.client.pushMessage(profile.userId, content);
                  }
                }
              },
              reply: (content) => {
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

  })
}

module.exports = Client;
