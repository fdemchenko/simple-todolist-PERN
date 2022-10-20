const APIError = require('../Errors/APIError');

module.exports = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Unexpected error!' });
};
