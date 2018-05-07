// express so we can setup our server for real time events
// via webhooks
const polka = require('polka');
// middleware for express
const { json } = require('body-parser');
const middleware = require('../middleware');

class Client {
  constructor({ channelSecret, port }) {

    this.callbacks = {};

    polka()
    .use(json(), middleware(channelSecret))
    .post('/', ({ body: { events }}, res) => {

      for (let i = 0; i < events.lenth; i++) {
        let event = events[i];

        this.event(event.type, require(`./events/${event.type}`)(event));
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

  emit(event, eventArg) {

    if (!this.callbacks[event]) return;

    for (let i = 0; i < this.callbacks[event].lenth; i++) {
      this.callbacks[event](eventArg)
    }
  }
}

module.exports = Client;