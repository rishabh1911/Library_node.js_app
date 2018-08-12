const debug = require('debug')('app:mongoService');
const { MongoClient, ObjectID } = require('mongodb');
// used destucturing insted of using const mongoClient = require('mongodb').MongoClient;
const mongoConstants = require('../constants/mongoConstants');
const booksFromConstant = require('../constants/books');

function mongoService() {
  async function insertFirstTime() {
    let client;
    debug('before try');
    try {
      client = await MongoClient.connect(mongoConstants.mongoUrl, { useNewUrlParser: true });
      debug('connected to MongoDb');
      const db = client.db(mongoConstants.dbName);
      const mongoResponse = await db.collection(mongoConstants.booksCollectionName)
        .insertMany(booksFromConstant);
      return mongoResponse;
    } catch (err) {
      debug(err.stack);
    }
    if (client !== undefined) {
      client.close();
    }
  }

  async function insertBook(book) {
    let client;
    debug('before try');
    try {
      client = await MongoClient.connect(mongoConstants.mongoUrl, { useNewUrlParser: true });
      debug('connected to MongoDb');
      const db = client.db(mongoConstants.dbName);
      const mongoResponse = await db.collection(mongoConstants.booksCollectionName)
        .insertOne(book);
      return mongoResponse;
    } catch (err) {
      debug(err.stack);
    }
    if (client !== undefined) {
      client.close();
    }
  }

  async function getAllBooks() {
    let client;
    try {
      client = await MongoClient.connect(mongoConstants.mongoUrl, { useNewUrlParser: true });
      debug('connected to server');
      const db = client.db(mongoConstants.dbName);
      const books = await db.collection(mongoConstants.booksCollectionName).find().toArray();
      return books;
    } catch (err) {
      debug(err.stack);
    }
    if (client !== undefined) {
      client.close();
    }
  }

  async function getBookbyId(id) {
    let client;
    try {
      client = await MongoClient.connect(mongoConstants.mongoUrl, { useNewUrlParser: true });
      debug('Inside getBookbyId');
      const db = client.db(mongoConstants.dbName);
      const book = await db.collection(mongoConstants.booksCollectionName)
        .findOne({ _id: new ObjectID(id) });
      // debug(book);
      return book;
    } catch (err) {
      debug(err.stack);
    }
    if (client !== undefined) {
      client.close();
    }
  }

  async function deleteBookbyId(id) {
    let client;
    try {
      client = await MongoClient.connect(mongoConstants.mongoUrl, { useNewUrlParser: true });
      debug('Inside deleteBookbyId');
      const db = client.db(mongoConstants.dbName);
      const book = await db.collection(mongoConstants.booksCollectionName)
        .deleteOne({ _id: new ObjectID(id) });
      // debug(book);
      return book;
    } catch (err) {
      debug(err.stack);
    }
    if (client !== undefined) {
      client.close();
    }
  }

  return {
    insertFirstTime,
    insertBook,
    getAllBooks,
    getBookbyId,
    deleteBookbyId
  };
}

module.exports = mongoService;
