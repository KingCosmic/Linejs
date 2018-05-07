const { reply } = require('../urls');
const { post } = require('../http');

const { toArray } = require('../helpers');

module.exports = (token, replyToken, messages) => {
  return post(
    token,
    reply,
    {
      messages: toArray(messages),
      replyToken
    }
  );
}