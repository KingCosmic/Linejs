const { multicast } = require('../urls');
const { get } = require('../http');

const { makeMessages } = require('../helpers');

module.exports = (token, to, messages) => {
  return post(
    token,
    multicast,
    {
      messages: makeMessages(messages),
      to
    }
  );
}
