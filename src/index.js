const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Tasks = require('./models/tasks');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users/:id', async (req, res) => {
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

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

app.get('/tasks/:id', async (req, res) => {
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

app.post('/users', async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const task = await new Tasks(req.body).save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send();
  }
});

app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send('error: invalid updates!');
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidUpdate) {
    return res.status(400).send('invalid updates');
  }
  try {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port);
