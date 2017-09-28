// express so we can setup our server for real time events
// via webhooks
const express = require('express');
// the line sdk to make working with their api easier
const line = require('@line/bot-sdk');
// middleware for express
const middleware = line.middleware

module.exports = class Client {
  constructor(config) {
    this.app = express();
    // setting up express to use lines middleware
    this.app.use(middleware(config))

    this.LineClient = new line.Client({
      channelAccessToken: config.channelAccessToken
    })

    this.callBacks = {};

    this.app.post('/', (req, res) => {
      var events = req.body.events;

      events.forEach((event) => {
        if (event.type == "message" && event.message.type != "text") return;
        var eventFunc = require(`./events/${event.type}`);
        eventFunc((event, this.LineClient, () => {
          this.event(`${event.type}`, arguments);
        }))
      }, this);
    })

    this.app.listen(config.port, () => {
      
    })
  }

  getUserProfile(userId) {
    return new Promise((resolve, reject) => {
      this.LineClient.getProfile(userId)
      .then((userProfile) => {
        resolve(userProfile);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

  sendMessage(id, message) {
    if (typeof(content) == "string") {
      this.LineClient.pushMessage(id, {type: "text", text: message});
    } else if (typeof(content) == "object") {
      this.LineClient.pushMessage(id, message);
    }
  }

  on(event, callback) {
    if (this.callBacks[event]) {
      this.callBacks[event].push(callback);
    } else if (!this.callBacks[event]) {
      this.callBacks[event] = []
      this.callBacks[event].push(callback);
    }
  }

  event(event) {
    
    var args = Array.from(arguments);

    // remove the event name from the arguments passed
    args.splice(0, 1);

    if (this.callBacks[event]) {
      this.callBacks[event].forEach((callback) => {
        callback.apply(null, args)
      }, this);
    } else if (!this.callBacks[event]) {
      return
    }
  }
  
}