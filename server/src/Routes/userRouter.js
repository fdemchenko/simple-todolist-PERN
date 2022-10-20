const express = require('express');
const userController = require('../Controllers/userController');
const validateUserRegistration = require('../Middlewares/validateUserRegistration');
const validateLoginMiddleware = require('../Middlewares/validateLoginMiddleware');

const userRouter = express.Router();

userRouter.post('/login', validateLoginMiddleware, userController.login);

userRouter.post('/registration', validateUserRegistration, userController.registration);

module.exports = userRouter;
