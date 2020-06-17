const request = require('supertest');
const app = require('../src/app');

test('Should signup a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Ayoub',
      email: 'ayoubyf@gmail.com',
      password: 'hellothere',
    })
    .expect(201);
});
