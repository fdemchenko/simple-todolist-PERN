const APIError = require('../Errors/APIError');

module.exports = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(APIError.badRequest('Username or password not provided'));
  }
  next();
}

