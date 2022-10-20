const APIError = require('../Errors/APIError');

module.exports = (req, res, next) => {
  try {
    const { title, done } = req.body;

    if (title && title.length > 255) {
      return next(APIError.badRequest('Title can\'t be longer than 255 chars'));
    }

    if (done && typeof done !== 'boolean') {
      return next(APIError.badRequest('Done field must be of type boolean'));
    }
  } catch (e) {
    console.log(e);
    next(APIError.bdaRequest('Fields are not valid!'));
  }

  next();
};
