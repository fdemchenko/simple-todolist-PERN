const APIError = require('../Errors/APIError');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(APIError.unauthorized('Auth token not provided'));
    }
    
    const authorizationKey = process.env.AUTH_KEY;
    if (!authorizationKey) {
      return next(APIError.internal('Authorization service error'));
    }

    const { id, username, email } = jwt.verify(token, authorizationKey); 
    req.user = { id, username, email };
    next();
  } catch (e) {
    console.log(e);
    return next(APIError.unauthorized('Invalid authorization token'));
  }
};
