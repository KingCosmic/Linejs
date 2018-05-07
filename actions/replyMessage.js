const { reply } = require('../urls');
const { post } = require('../http');

const { makeMessages } = require('../helpers');

module.exports = (token, replyToken, messages) => {
  return post(
    token,
    reply,
    {
      messages: makeMessages(messages),
      replyToken
    }
  );
}