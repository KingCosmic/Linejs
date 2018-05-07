// express so we can setup our server for real time events
// via webhooks
const polka = require('polka');
// middleware for express
const { json } = require('body-parser');
const middleware = require('../middleware');

class Client {
  constructor({ channelAccessToken, channelSecret, port }) {
    this.channelAccessToken = channelAccessToken;
    this.channelSecret = channelSecret;

    this.callbacks = {};

    let self = this;

    polka()
    .use(json(), middleware(channelSecret))
    .post('/', ({ body: { events }}, res) => {
      for (let i = 0; i < events.length; i++) {
        let event = events[i];
        self.event(event.type, require(`./events/${event.type}`)(event, self.channelAccessToken));
      };
    })
    .listen(port).then(_ => {
      console.log(`> Running on localhost: ${port}`);
    });
  }

  on(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event].push(callback);
    } else if (!this.callbacks[event]) {
      this.callbacks[event] = []
      this.callbacks[event].push(callback);
    }
  }

  event(event, eventArg) {
    if (!this.callbacks[event]) return;

    for (let i = 0; i < this.callbacks[event].length; i++) {
      this.callbacks[event][i](eventArg)
    }
  }
}

module.exports = Client;