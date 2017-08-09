const express = require('express')
const line = require('@line/bot-sdk');
const middleware = line.middleware

function Client(config) {

  this.app = express();

  this.client = new line.Client({
    channelAccessToken: config.channelAccessToken
  });

  this.on = function(event, callback) {
    if (event == "message") this.message = callback;
  }

  this.app.use(middleware(config))

  this.app.post('/webhook', (req, res) => {
    //res.json(req.body.events) // req.body will be webhook event object

    var that = this;

    var events = req.body.events;

    if (events.length == 1) {
      var event = events[0];

      if (event.type == "message" && event.message.type == "text") {
        // check for commands and change the response msg

        var msg = {
          content: event.message.text,
          reply: function(content) {
            that.client.replyMessage(event.replyToken, {type: "text", text: content})
          }
        }

        if (this.message) {
          this.message(msg);
        }

      }

    }

  })

  this.app.listen(config.port, function() {
    console.log("ready");
  })
}

module.exports = Client;
