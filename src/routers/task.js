const express = require('express');
const Tasks = require('../models/tasks');
const authMiddleware = require('../middleware/auth');
const router = new express.Router();

router.get('/tasks', authMiddleware, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    // it will equel true if the string was true
    match.completed = req.query.completed === 'true';
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    //تنازلي او تصاعدي
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    // const tasks = await Tasks.find({ owner: req.user._id });
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const _id = req.params.id;
    // const task = await Tasks.findById(_id);
    const task = await Tasks.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.post('/tasks', authMiddleware, async (req, res) => {
  try {
    const task = await new Tasks({ ...req.body, owner: req.user._id }).save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send();
  }
});

router.patch('/tasks/:id', authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidUpdate) {
    return res.status(400).send('invalid updates');
  }
  try {
    // const task = await Tasks.findById(req.params.id);
    const task = await Tasks.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Tasks.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
