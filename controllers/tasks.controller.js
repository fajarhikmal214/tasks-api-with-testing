const TasksModel = require("../models/tasks.model");
const { validateTask } = require("../utils/task-schema");

// Get all tasks
function index(req, res) {
  try {
    const tasks = TasksModel;

    res.status(200).json({
      status: 200,
      messages: "Get all tasks successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      messages: error.message ?? error.messages,
    });
  }
}

// Get task by id
function show(req, res) {
  try {
    const tasks = TasksModel;
    const { id } = req.params;

    const task = tasks.find((task) => task.id === parseInt(id));

    if (!task) {
      res.status(404).json({
        status: 404,
        message: "The task with the provides ID does not exist",
      });
    }

    res.status(200).json({
      status: 200,
      messages: "Get a task successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      messages: error.message ?? error.messages,
    });
  }
}

// Create new a task
function store(req, res) {
  try {
    const { error } = validateTask(req.body);

    if (error) {
      res.status(422).json({
        status: 500,
        messages: error.message ?? error.messages,
      });
    }

    const tasks = TasksModel;

    const task = {
      id: tasks.length + 1,
      name: req.body.name,
      completed: req.body.completed,
    };

    tasks.push(task);

    res.status(201).json({
      status: 201,
      messages: "Create a task successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      messages: error.message ?? error.messages,
    });
  }
}

// Update a task by id
function update(req, res) {
  try {
    const { name, completed } = req.body;
    const { error } = validateTask(req.body);

    if (error) {
      res.status(422).json({
        status: 422,
        messages: error.message ?? error.messages,
      });
    }

    const tasks = TasksModel;
    const { id } = req.params;

    const task = tasks.find((task) => task.id === parseInt(id));

    if (!task) {
      res.status(404).json({
        status: 404,
        message: "The task with the provides ID does not exist",
      });
    }

    if (req.method === "PUT") {
      task.name = name;
      task.completed = completed;
    } else if (req.method === "PATCH") {
      if (name) {
        task.name = name;
      }

      if (completed) {
        task.completed = completed;
      }
    }

    res.status(200).json({
      status: 200,
      messages: "Update a task successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      messages: error.message ?? error.messages,
    });
  }
}

// Delete a task by id
function destroy(req, res) {
  const tasks = TasksModel;
  const { id } = req.params;

  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    res.status(404).json({
      status: 404,
      message: "The task with the provides ID does not exist",
    });

    return;
  }

  const index = tasks.indexOf(task);
  tasks.splice(index, 1);

  res.json({
    status: 200,
    messages: "Delete a task successfull",
  });
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
