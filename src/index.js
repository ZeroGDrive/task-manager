const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Tasks = require('./models/tasks');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/users', (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send());
});

app.get('/users/:id', (req, res) => {
  const _id = req.params.id;

  User.findOne(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send(err));
});

app.get('/tasks', (req, res) => {
  Tasks.find({})
    .then((tasks) => res.send(tasks))
    .catch((err) => res.status(500).send(err));
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;

  Tasks.findById(_id)
    .then((task) => {
      if (!task) {
        res.status(404).send();
      }
      res.send(task);
    })
    .catch((err) => res.status(500).send(err));
});

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(201).send(user))
    .catch((error) => res.status(400).send(error));
});

app.post('/tasks', (req, res) => {
  const task = new Tasks(req.body);
  task
    .save()
    .then(() => res.status(201).send(task))
    .catch((err) => res.status(400).send(err));
});

app.listen(port);
