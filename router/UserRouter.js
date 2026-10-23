const express = require('express');
const UserRouter = express.Router();
const UserController = require('../controller/UserController');

UserRouter.get('/', UserController.GetUsers);
UserRouter.get('/:id', UserController.GetUserByID);
UserRouter.post('/', UserController.PostUser);
UserRouter.put('/:id', UserController.PutUser);
UserRouter.delete('/:id', UserController.DeleteUser);

module.exports = UserRouter;