const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Tasks = require("./models/tasks");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Tasks.findById(_id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = await new Tasks(req.body).save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send();
  }
});

app.listen(port);
