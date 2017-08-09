# Linejs
a wrapper for the line api in js

## Installation

atm dont have this uploaded to npm will do so once they respond

## Usage
const line = require('./index.js');

var client = new line.Client({
  channelAccessToken: "",
  channelSecret: "",
  port: "8080"
})

client.on("message", function(msg) {

})
