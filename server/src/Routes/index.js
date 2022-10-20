const Router = require('express');
const userRouter = require('./userRouter');
const tasksRouter = require('./tasksRouter');
const checkAuth = require('../Middlewares/checkAuth');

const router = new Router();

router.use('/tasks', checkAuth, tasksRouter);
router.use('/user', userRouter);

module.exports = router;
