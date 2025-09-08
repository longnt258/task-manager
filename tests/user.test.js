const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, initialDb } = require('../tests/fixtures/db')

beforeEach(initialDb)

test('Should signup a new user', async () => {
  const response = await request(app).post('/users')
          .send({
            name: 'User Test 3',
            age: 24,
            password: '12345678',
            email: 'test3@gmail.com'
          })
          .expect(201)

  // Assert that the database was changed correctly
  const user = await User.findOne({ _id: response.body.user._id })
  expect(user).not.toBeNull()

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'User Test 3',
      email: 'test3@gmail.com'
    },
    token: user.tokens[0].token
  })
})

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login')
          .send({
            email: userOne.email,
            password: userOne.password
          })
          .expect(200)

  // Assert that token in response mathches users second token
  const user = await User.findOne({ _id: response.body.user._id })
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should login existing user with failure', async () => {
  await request(app).post('/users/login')
          .send({
            email: userOne.email,
            password: userOne.password + '1'
          })
          .expect(400)
})

test('Should get profile for user', async () => {
  await request(app).get('/users/me')
          .set('Authorization', 'Bearer ' + userOne.tokens[0].token)
          .expect(200)
})

test('Should delete account for user', async () => {
  await request(app).delete('/users/me')
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .expect(200)

  // Assert null response user
  const user = await User.findOne({ _id: userOneId })
  expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
  await request(app).delete('/users/me')
          .expect(401)
})

test('Should upload avatar image', async () => {
  await request(app).post('/users/me/avatar')
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .attach('avatar', 'tests/fixtures/dog.webp')
          .expect(200)
  
  const user = await User.findOne({ _id: userOne._id })
  expect(user.avatar).toEqual(expect.any(Buffer)) // compare type of data

  /* 
    In JS, {} !== {} because of reference comparation in memory with object
    expect().toBe() is ===
  */
})

test('Should update valid user fields', async () => {
  const response = await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
          name: 'Test update valid name'
        })
        .expect(200)

  const user = await User.findOne({ _id: userOneId })
  expect(user.name).toEqual('Test update valid name')
})

test('Should not update invalid user fields', async () => {
  await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
          location: 'Invalid field'
        })
        .expect(400)
})