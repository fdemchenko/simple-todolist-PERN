const APIError = require('../Errors/APIError');
const { User } = require('../Models/models');
const { Op } = require('sequelize');

module.exports = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    next(APIError.badRequest('Username, password or email are not provided!'));
  }
  
  const emailRegExp = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$');
  const usernameRegExp = new RegExp('^[a-zA-Z0-9\.\_]+$');
  const passwordRegExp = new RegExp('^[a-zA-Z0-9]{6,16}$');
  
  if (!emailRegExp.test(email.trim())) {
    next(APIError.badRequest('Incorrect value for email, please check it'));
  }

  if (!usernameRegExp.test(username.trim())) {
    next(APIError.badRequest('Incorrect value for username, please use only letters and digits'));
  }

  if (!passwordRegExp.test(password.trim())) {
    next(APIError.badRequest('Incorrect password'));
  }
  
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        { username },
        { email }
      ]
    }
  });


  if (existingUser) {
    next(APIError.badRequest('User already exists!'));
  }
  next();
};
