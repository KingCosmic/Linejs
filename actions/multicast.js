const { multicast } = require('../urls');
const { get } = require('../http');

module.exports = (token, to, messages) => {
  return post(
    token,
    multicast,
    {
      messages: toArray(messages),
      to
    }
  );
}
