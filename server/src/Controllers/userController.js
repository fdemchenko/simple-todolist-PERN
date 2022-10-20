const bcrypt = require('bcryptjs');
const APIError = require('../Errors/APIError');
const { User } = require('../Models/models');
const generateJWT = require('../Services/generateJWT');


class UserController {
  async registration(req, res, next) {
    const { username, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 5);
    const newUser = await User.create({ username, email, password: passwordHash});

    const authorizationKey = process.env.AUTH_KEY;
    if (!authorizationKey) {
      return next(APIError.internal('Authorization service error'));
    }
    const jwtToken = generateJWT({ id: newUser.id, username, email }, authorizationKey, '1h');
    res.json({ token: jwtToken });
  }

  async login(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return next(APIError.badRequest('Authorization error. Check username or password'));
    }
    
    const passwordHash = user.password;
    const validPassword = bcrypt.compare(password, passwordHash);
    if (!validPassword) {
      return next(APIError.badRequest('Authorization error. Check username or password'));
    }

    const authorizationKey = process.env.AUTH_KEY;
    if (!authorizationKey) {
      return next(APIError.internal('Authorization service error'));
    }

    const jwtToken = generateJWT({ id: user.id, username, email: user.email }, authorizationKey, '1h');
    res.json({ token: jwtToken });
  }
};

module.exports = new UserController();
