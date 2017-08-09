# Linejs
a wrapper for the line api in js

## Installation

npm install --save line.js

## Usage
const line = require('line.js');

var client = new line.Client({
  channelAccessToken: "",
  channelSecret: "",
  port: "8080"
})

client.on("message", function(msg) {

})
