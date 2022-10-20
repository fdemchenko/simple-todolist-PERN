const jwt = require('jsonwebtoken');

module.exports = (payload, secret, duration) => {
  return jwt.sign(payload, secret, { expiresIn: duration });
};


