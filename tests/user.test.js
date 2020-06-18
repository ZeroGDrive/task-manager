const request = require('supertest');
const app = require('../src/app');
const { setupDatabase, user1, user1ID } = require('./fixtures/db');
const User = require('../src/models/user');

beforeEach(setupDatabase);

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Ayoub',
      email: 'ayoubyf@gmail.com',
      password: 'hellothere',
    })
    .expect(201);

  //Assert that the database was changed successfuly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertion about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Ayoub',
      email: 'ayoubyf@gmail.com',
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe(response.body.user.password);
});

test('Logint exciting user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: user1.email,
      password: user1.password,
    })
    .expect(200);

  const user = await User.findById(user1ID);
  // tokens[1] because this is the second token it generates
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexciting user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'ayoubyf@gmail.com',
      password: 'hellofromthe',
    })
    .expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(user1ID);
  expect(user).toBeNull();
});

test('Should not delete account for notexciting user', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .attach(
      'avatar',
      'tests/fixtures/92828646_2688717778026430_8123023178218864640_o.jpg'
    )
    .expect(200);

  const user = await User.findById(user1ID);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
  const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send({
      name: 'Ahmed',
    })
    .expect(200);

  const user = await User.findById(user1ID);
  expect(user.name).toBe('Ahmed');
});

test('Should not update invalid fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send({
      password: 'password',
    })
    .expect(400);
});

// __mocks__ is a file to copy the function we use from third party providers that does real work for us and set them empty to run tests freely
