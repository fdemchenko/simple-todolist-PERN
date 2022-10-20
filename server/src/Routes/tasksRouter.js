const express = require('express');
const tasksController = require('../Controllers/tasksController');
const validateNewTask = require('../Middlewares/validateNewTask');
const validateUpdatingTask = require('../Middlewares/validateUpdatingTask');
const tasksRouter = express.Router();


tasksRouter.get('/', tasksController.getAllTasks);

tasksRouter.get('/:taskID', tasksController.getOneTask);

tasksRouter.post('/', validateNewTask, tasksController.createTask);

tasksRouter.put('/:taskID', validateUpdatingTask, tasksController.updateTask);

tasksRouter.delete('/:taskID', tasksController.deleteTask);

module.exports = tasksRouter;
