# Linejs
A wrapper for the line api in js.

if you have any questions feel free to msg me on [Discord](https://discordapp.com/) KingCosmic#2713 or [line](https://line.me/en/) austyn-studdard

## Installation

```
npm install --save line.js
```

## Setup

1. First of, to get real time events from line we have to make a **http server**

2. If we want get that http server accesible to the real world instead of just localhost we will use [ngrok](https://ngrok.com/)

3. To use ngrok you will have to open a cmd (Windows) or terminal (MacOS) and navigate to the folder where you have the

ngrok executable located and type `ngrok http port` replacing port with the port number you used in your config for line.js.

It will then give you a link that is something like `https://8239483209.ngrok.io`, copy that and head to your bots page

[BotPage](https://developers.line.me/console/) click on your bots Line Devlopers button and set its webhook to the ngrok link you got.

## Usage
```JS
const line = require('line.js');

var client = new line.Client({
  channelAccessToken: "",
  channelSecret: "",
  port: "8080"
})

client.on("message", function(msg) {

  // msg = { content: String, author: Object, reply: function(content) }
  // msg.author = { username: String, id: Number, pictureUrl: Url, statusMessage: String, sendMessage: function(content) }
  // if its a group msg
  // msg.group = { id: Number, sendMessage: function(content), leave: function }

  if (msg.content == "ping") {
    msg.reply("pong");
  }

  if (msg.content == "msg me") {
    msg.author.sendMessage("Hello Sir");
  }

  if (msg.content == "leave" && msg.group) {
    msg.group.leave();
  }

})
```
