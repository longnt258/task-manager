const { MongoClient, ServerApiVersion } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

client.connect()
  .then(() => {
    console.log('Connected correctly to server');
    const db = client.db(dbName);
    // db.collection('users').insertOne({
    //   name: 'Long dep zai',
    //   age: 24
    // })

    // Insert 3 tasks
    // db.collection('tasks').insertMany([
    //   { description: 'Task 1', completed: false },
    //   { description: 'Task 2', completed: false },
    //   { description: 'Task 3', completed: true },
    // ]).then(ressult => console.log(ressult))
    // .catch(err => console.log(err));

    // Find tasks
    // db.collection('tasks').findOne({ description: 'Task 1'})
    //   .then(user => console.log(user))
    //   .catch(err => console.log(err));
    // db.collection('tasks').find({ completed: false }).toArray()
    //   .then(users => console.log(users))
    //   .catch(err => console.log(err));

    // Update tasks
    // db.collection('tasks').updateMany({ completed: false }, {
    //   $set: { completed: true }
    // }).then(result => console.log(result))
    // .catch(err => console.log(err));

    // Delete tasks
    db.collection('tasks').deleteOne({ description: 'Task 3' })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  })
  .catch(err => {
    console.log(err);
});