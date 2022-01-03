const express = require("express");

const TasksRouter = express.Router();
const TasksController = require("../controllers/tasks.controller");

TasksRouter.get("/", TasksController.index);
TasksRouter.get("/:id", TasksController.show);
TasksRouter.post("/", TasksController.store);
TasksRouter.put("/:id", TasksController.update);
TasksRouter.patch("/:id", TasksController.update);
TasksRouter.delete("/:id", TasksController.destroy);

module.exports = TasksRouter;
