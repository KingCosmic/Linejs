# Linejs
a wrapper for the line api in js

## Installation

npm install --save line.js

## Setup

to get real time events from line we have to make a http server

to get that http server accesible to the real world instead of just on localhost ill use ngrok[https://ngrok.com/]

to use ngrok you'll have to open a cmd (windows) or terminal (mac) (not sure on linux) and navigate to where you have the

ngrok.exe located and type `ngrok http port` replacing port with the number you used in your config for line.js

it will then give you a link that is something like `https://8239483209.ngrok.io` copy that and head to your bots page

BotPage[https://business.line.me/en/companies/1273117/accounts?ownerType=company&roleType=operator] click on your bots Line Devlopers button and set its webhook to the ngrok link you got.

## Usage
const line = require('line.js');

var client = new line.Client({
  channelAccessToken: "",
  channelSecret: "",
  port: "8080"
})

client.on("message", function(msg) {

})
