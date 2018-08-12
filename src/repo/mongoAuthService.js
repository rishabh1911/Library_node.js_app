const debug = require('debug')('app:mongoAuthService');
const { MongoClient, ObjectID } = require('mongodb');
const mongoConstants = require('../constants/mongoConstants');

const addUser = {
  async mAddUser(user) {
    let client;
    try {
      client = await MongoClient.connect(mongoConstants.mongoUrl, { useNewUrlParser: true });
      debug('Connected to mongoDB');
      const db = client.db(mongoConstants.dbName);
      const mongoResponse = await db.collection(mongoConstants.authCollectionName)
        .insertOne(user);
      const userResponse = mongoResponse.ops[0];
      return userResponse;
    } catch (err) {
      debug(err);
    }
  }
};

module.exports = addUser;
