const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const User = require('../../src/models/user');
const Tasks = require('../../src/models/tasks');

const user1ID = new mongoose.Types.ObjectId();
const user1 = {
  _id: user1ID,
  name: 'Ayoub',
  email: 'ayoubyf3@gmail.com',
  password: 'hellofromthe',
  tokens: [
    {
      token: jwt.sign({ _id: user1ID }, keys.jwtSecret),
    },
  ],
};
const user2ID = new mongoose.Types.ObjectId();
const user2 = {
  _id: user2ID,
  name: 'Ayoub',
  email: 'ayoubyf4@gmail.com',
  password: 'hellofromthe',
  tokens: [
    {
      token: jwt.sign({ _id: user2ID }, keys.jwtSecret),
    },
  ],
};

const task1 = {
  _id: new mongoose.Types.ObjectId(),
  description: 'First task',
  completed: false,
  owner: user1ID,
};
const task2 = {
  _id: new mongoose.Types.ObjectId(),
  description: 'second task',
  completed: true,
  owner: user1ID,
};
const task3 = {
  _id: new mongoose.Types.ObjectId(),
  description: 'third task',
  completed: true,
  owner: user2ID,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Tasks.deleteMany();
  await new User(user1).save();
  await new User(user2).save();
  await new Tasks(task1).save();
  await new Tasks(task2).save();
  await new Tasks(task3).save();
};

module.exports = {
  user1ID,
  user1,
  user2,
  user2ID,
  task1,
  task2,
  task3,
  setupDatabase,
};
