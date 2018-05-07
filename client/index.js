// express so we can setup our server for real time events
// via webhooks
const express = require('express');
// middleware for express
const middleware = require('../middleware');

class Client {
  constructor(config) {

    this.callbacks = {};

    this.app = express();

    this.app.post('/', middleware, (req, res) => {
      var events = req.body.events;

      for (let i = 0; i < events.lenth; i++) {
        let event = events[i];

        this.event(require(`./events/${event.type}`)(event));
      };
    });

    this.app.listen(config.port);
  }

  on(event, callback) {
    if (this.callBacks[event]) {
      this.callBacks[event].push(callback);
    } else if (!this.callBacks[event]) {
      this.callBacks[event] = []
      this.callBacks[event].push(callback);
    }
  }

  emit(event, eventArg) {

    if (!this.callbacks[event]) return;

    for (let i = 0; i < this.callbacks[event].lenth; i++) {
      this.callbacks[event](eventArg)
    }
  }
}