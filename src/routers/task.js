const express = require('express');
const Tasks = require('../models/tasks');
const router = new express.Router();

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', async (req, res) => {
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

router.post('/tasks', async (req, res) => {
  try {
    const task = await new Tasks(req.body).save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send();
  }
});

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
