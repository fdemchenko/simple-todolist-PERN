const { Task } = require('../Models/models');
const APIError = require('../Errors/APIError');

class tasksController {
  async getAllTasks(req, res, next) {
    const userID = req.user.id;
    let { limit, page, done } = req.query;

    limit = parseInt(limit) || 9;
    page = parseInt(page) || 1;
    const offset = (page - 1) * limit;

    const tasks = await Task.findAndCountAll({ where: { userId: userID }, 
      limit, 
      offset,
      order: [['id', 'DESC']]
    });
    res.json(tasks);
  }

  async getOneTask(req, res, next) {
    try {
      const taskID = req.params.taskID;
      const userID = req.user.id;
      const candidate = await Task.findOne({ where: { id: taskID } });
      if (!candidate) {
        return next(APIError.badRequest('Task doesn\'t exist'));
      }

      if (candidate.userId !== userID) {
        return next(APIError.forbidden('Forbidden'));
      }

      res.json(candidate);
    } catch (e) {
      console.log(e);
      next(APIError.badRequest('Bad request'));
    }
  }

  async createTask(req, res) {
    const { title } = req.body;
    const userId = req.user.id;
    const description = req.body.description || null;
    const done = req.body.done || false;
    
    const newTask = await Task.create({ title, description, userId, done });
    res.json(newTask);
  }

  async updateTask(req, res, next) {
    try {
      const taskID = req.params.taskID;
      const userID = req.user.id;
      let { title, description, done } = req.body;
      done = done || false;

      const taskForUpdate = await Task.findOne({ where: { id: taskID } });
      if (!taskForUpdate) {
        return next(APIError.badRequest('Task doesn\'t exist'));
      }

      if (taskForUpdate.userId !== userID) {
        return next(APIError.forbidden('Forbidden'));
      }
      
      title = title || taskForUpdate.title;
      description = description || taskForUpdate.description;

      const result = await Task.update(
        { title, description, done },
        { where: { id: taskID } }
      );
      res.json(result);
      
    } catch (e) {
      console.log(e);
      return next(APIError.badRequest('Bad request'));
    }
  }

  async deleteTask(req, res, next) {
    try {
      const taskID = req.params.taskID;
      const userID = req.user.id;

      const taskForDelete = await Task.findOne({ where: { id: taskID } });
      if (!taskForDelete) {
        return next(APIError.badRequest('Task doesn\'t exist'));
      }

      if (taskForDelete.userId !== userID) {
        return next(APIError.forbidden('Forbidden'));
      }

      await Task.destroy({ where: { id: taskID } });
      res.json(taskForDelete);
    } catch (e) {
      console.log(e);
      return next(APIError.badRequest('Bad request'));
    }
  }
};

module.exports = new tasksController();
