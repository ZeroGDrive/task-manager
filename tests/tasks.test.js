const request = require('supertest');
const app = require('../src/app');
const {
  setupDatabase,
  user1,
  user1ID,
  user2,
  user2ID,
  task1,
  task2,
  task3,
} = require('./fixtures/db');
const Tasks = require('../src/models/tasks');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send({
      description: 'Washing the car',
    })
    .expect(201);

  const task = await Tasks.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toBe(false);
});

test('Should get all tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test('Should not delete other users tasks', async () => {
  const response = await request(app)
    .delete(`/tasks/${task1._id}`)
    .set('Authorization', `Bearer ${user2.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Tasks.findById(task1._id);
  expect(task).not.toBeNull();
});
