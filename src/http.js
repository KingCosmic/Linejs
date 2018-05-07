const snek = require('snekfetch');

const pkg = require('../package.json');

const userAgent = `${pkg.name}/${pkg.version}`;

exports.get = (token, url) => {
  return snek.get(url, {
    headers: {
      'User-Agent': userAgent,
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.body);
}

exports.post = (token, url, data) => {
  return snek.post(url, {
    data: data,
    headers: {
      'User-Agent': userAgent,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => res.body);
}

exports.del = (token, url) => {
  return snek.delete(url, {
    headers: {
      'User-Agent': userAgent,
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.body)
}