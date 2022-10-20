const APIError = require('../Errors/APIError');

module.exports = (req, res, next) => {
  try {
    const { title } = req.body;
    const done = req.body.done || false;

    if (!title) {
      return next(APIError.badRequest('Title can\'t be empty'));
    }

    if (title.length > 255) {
      return next(APIError.badRequest('Title can\'t be longer than 255 chars'));
    }

    if (typeof done !== 'boolean') {
      return next(APIError.badRequest('Done field must be of type boolean'));
    }
  } catch (e) {
    console.log(e);
    return next(APIError.badRequest('Fields are not valid!'));
  }

  next();
};
