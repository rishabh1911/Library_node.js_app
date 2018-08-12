const debug = require('debug')('app:mongoService');
const { MongoClient, ObjectID } = require('mongodb');
// used destucturing insted of using const mongoClient = require('mongodb').MongoClient;
const mongoConstants = require('../constants/mongoConstants');
const booksFromConstant = require('../constants/books');

const insertFirstTime = {
  async mInsertFirstTime() {
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

};

const getAllBooks = {
  async mgetAllBooks() {
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
};

const getBookById = {
  async  mGetBookbyId(id) {
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
};

module.exports = {
  insertFirstTime,
  getAllBooks,
  getBookById
};
