const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const validPriorities = ["low", "medium", "high"];

//Input validation function
function validateInput(data) {
  const { title, description, completed, priority } = data;

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof description !== "string" ||
    description.trim() === "" ||
    typeof completed !== "boolean" ||
    (priority && !validPriorities.includes(priority))
  ) {
    return false;
  }
  return true;
}

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

const tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
    priority: "high",
    createdAt: new Date(),
  },
];

// Base Endpoint
app.get("/", (req, res) => {
  res.status(200).send("Hello from the task manager API!");
});

// Endpoint to get all tasks
app.get("/tasks", (req, res) => {
  const completed = req.query.completed;
  const sortOrder = req.query.sortOrder;
  var result = [...tasks];
  //Filter tasks based on completed status
  if (completed !== undefined) {
    if (completed !== "true" && completed !== "false") {
      return res
        .status(400)
        .send("Invalid value for 'completed'. Use true or false.");
    }
    const isCompleted = completed === "true";
    result = result.filter((task) => task.completed === isCompleted);
  }
  if (result.length === 0) {
    return res.status(404).send("No tasks found");
  }
  //Sort tasks by creation date
  if (sortOrder === "ascending") {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortOrder === "descending") {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOrder) {
    return res
      .status(400)
      .send("Invalid sortOrder value. Use 'ascending' or 'descending'.");
  }
  res.status(200).send(result);
});

//Get a task by ID
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).send("Non-existent task");
  }

  res.status(200).send(task);
});

// Get tasks by priority
app.get("/tasks/priority/:level", (req, res) => {
  const level = req.params.level.toLowerCase();

  if (!validPriorities.includes(level)) {
    return res.status(400).send("Invalid priority level");
  }

  const filteredTasks = tasks.filter((task) => task.priority === level);
  if (filteredTasks.length === 0) {
    return res.status(404).send("No tasks found with the specified priority");
  }
  res.status(200).send(filteredTasks);
});

//Add a new task
app.post("/tasks", (req, res) => {
  if (!validateInput(req.body)) {
    return res.status(400).send("Invalid input data");
  }
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    priority: req.body.priority,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  res.status(201).send(newTask);
});

//Update a task by ID
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!validateInput(req.body)) {
    return res.status(400).send("Invalid input data");
  }
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).send("Non-existent task");
  }

  // Update fields
  tasks[taskIndex] = {
    id: id,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    priority: req.body.priority,
    createdAt: tasks[taskIndex].createdAt,
  };

  res.status(200).send(tasks[taskIndex]);
});

//Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).send("Non-existent task");
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.status(200).send("Task deleted : " + deletedTask[0].title);
});

module.exports = app;
