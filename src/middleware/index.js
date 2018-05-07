const validateSignature = require('./validateSignature');

const middleware = (channelSecret) => {
  if (!channelSecret) throw new Error('no channel secret');

  return (req, res, next) => {
    // header names are lower-cased
    // https://nodejs.org/api/http.html#http_message_headers
    const signature = req.headers['x-line-signature'];

    if (!signature) return next(new Error('no signature'));
    let body = JSON.stringify(req.body);

    return validate(body, channelSecret, signature, next);
  }
}

const validate = (body, secret, signature, next) => {
  if (!validateSignature(body, secret, signature))
    return next(new Error(`signature validation failed ${signature}`));

  next();
};

module.exports = middleware;