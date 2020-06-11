const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');
const router = new express.Router();

router.get('/users/me', authMiddleware, async (req, res) => {
  res.send(req.user);
});

router.post('/users', async (req, res) => {
  try {
    const user = await new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

router.post('/users/logout', authMiddleware, async (req, res) => {
  try {
    // I passed the token and the whole user from the authMiddleware
    // and now deleting the token from this specific device
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.patch('/users/me', authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send('error: invalid updates!');
  }

  try {
    // we did this becasue the prev one was not iceal from middlewares
    //I removed the line below cause we don't have to fetch user anymore and we can get it from req.user
    // const user = await User.findById(req.user._id);

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/users/me', authMiddleware, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
