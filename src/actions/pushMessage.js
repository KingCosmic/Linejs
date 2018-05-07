const { push } = require('../urls');
const { post } = require('../http');

const { makeMessages } = require('../helpers');

module.exports = (token, to, messages) => {
  return post(
    token,
    push,
    {
      messages: makeMessages(messages),
      to
    }
  );
}