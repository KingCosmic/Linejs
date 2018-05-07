const { profile } = require('../urls');
const { get } = require('../http');

const { checkJSON } = require('../helpers');

module.exports = (token, userId) => {
  return get(token, profile(userId)).then(checkJSON);
}