// express so we can setup our server for real time events
// via webhooks
const express = require('express');
// the line sdk to make working with their api easier
const line = require('@line/bot-sdk');
// middleware for express
const middleware = line.middleware

module.exports = function Client(config) {
  
  this.app = express();

  global.LineClient = new line.Client({
    channelAccessToken: config.channelAccessToken,
    channelSecret: config.channelSecret
  })

  this.callBacks = {};

  this.on = (event, callback) => {
    if (this.callBacks[event]) {
      this.callBacks[event].push(callback);
    } else if (!this.callBacks[event]) {
      this.callBacks[event] = []
      this.callBacks[event].push(callback);
    }
  }

  this.getUserProfile = (userId) => {
    return new Promise((resolve, reject) => {
      LineClient.getProfile(userId)
      .then((userProfile) => {
        resolve(userProfile);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

  this.sendMessage = (id, message) => {
    if (typeof(message) == "string") {
      LineClient.pushMessage(id, {type: "text", text: message});
    } else if (typeof(message) == "object") {
      LineClient.pushMessage(id, message);
    }
  }

  this.event = (event, eventArg) => {

    if (this.callBacks[event]) {
      this.callBacks[event].forEach((callback) => {
        callback(eventArg)
      }, this);
    } else if (!this.callBacks[event]) {
      return
    }
  }

  this.app.use(middleware(config))

  this.app.post('/', (req, res) => {
    var events = req.body.events;

    events.forEach((event) => {
      if (event.type == "message" && event.message.type != "text") return;
      var eventFunc = require(`./events/${event.type}`);
      eventFunc(event, (eventArg) => {
        this.event(event.type, eventArg);
      })
    }, this);
  })

  this.app.listen(config.port, () => {

  });
  
}