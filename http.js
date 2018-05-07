const snek = require('snekfetch');

const pkg = require('./package.json');

const userAgent = `${pkg.name}/${pkg.version}`;

exports.get = (token, url) => {
  return snek.get(url, {
    agent: userAgent,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.body);
}

exports.post = (token, url, data) => {
  return snek.post(url, {
    agent: userAgent,
    data: data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => res.body);
}

exports.del = (token, url) => {
  return snek.delete(url, {
    agent: userAgent,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.body)
}