const { push } = require('../urls');
const { post } = require('../http');

const { toArray } = require('../helpers');

module.exports = (token, to, messages) => {
  return post(
    token,
    push,
    {
      messages: toArray(messages),
      to
    }
  );
}