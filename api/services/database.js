const { MongoClient } = require("mongodb");
require('dotenv').config()

let db;
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

const uri =
  `mongodb+srv://${db_user}:${db_pass}@whiteboard.keari.mongodb.net/whiteboard?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(async err => {
  db = client.db('Whiteboard')
})

async function max_(table_name, where, col, callback, retries = 5) {
  try {
    if (retries > 0) {
      const table = db.collection(table_name);
      const result = await table.find(where).sort({ [col]: -1 }).limit(1).project({ [col]: 1 }).next();
      callback(result, client);
    }
    else {
      callback(null)
    }
  }
  catch (err) {
    console.log(err)
    console.log('retrying');
    setTimeout(() => max_(table_name, where, col, callback, retries - 1), 5000)
  }
}

async function select_(table_name, where, projection, callback, retries = 5) {
  try {
    if (retries > 0) {
      const table = db.collection(table_name);
      const cursor = table.find(where).project(projection);
      const result = await cursor.toArray();
      callback(result);
    }
    else {
      callback(null)
    }
  }
  catch (err) {
    console.log(err)
    console.log('retrying');
    setTimeout(() => select_(table_name, where, projection, callback, retries - 1), 5000)
  }
}

async function insert_(table_name, row, callback = null, retries = 5) {
  try {
    if (retries > 0) {
      const table = db.collection(table_name);
      const result = await table.insertOne(row);
      if (callback) {
        callback(result);
      }
    }
    else {
      callback(null)
    }

  }
  catch (err) {
    console.log(err)
    console.log('retrying');
    setTimeout(() => insert_(table_name, row, callback, retries - 1), 5000)
  }
}

async function update_(table_name, where, values, callback = null, retries = 5) {
  try {
    if (retries > 0) {
      const table = db.collection(table_name);
      const row = { $set: values };
      const result = await table.updateMany(where, row);
      if (callback) {
        callback(result);
      }
    }
    else {
      callback(null)
    }
  }
  catch (err) {
    console.log(err)
    console.log('retrying');
    setTimeout(() => update_(table_name, where, values, callback, retries - 1), 5000)
  }
}

async function delete_(table_name, where, callback = null, retries = 5) {
  try {
    if (retries > 0) {
      const table = db.collection(table_name);
      const result = await table.deleteMany(where);
      if (callback) {
        callback(result);
      }
    }
    else {
      callback(null)
    }
  }
  catch (err) {
    console.log(err)
    console.log('retrying');
    setTimeout(() => delete_(table_name, where, callback, retries - 1), 5000)
  }
}

module.exports = {
  select_: select_,
  max_: max_,
  insert_: insert_,
  update_: update_,
  delete_: delete_
};
