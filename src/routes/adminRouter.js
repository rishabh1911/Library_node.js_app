const express = require('express');
const debug = require('debug')('app:adminRoutes');
const { MongoClient } = require('mongodb');
// used destucturing insted of using const mongoClient = require('mongodb').MongoClient;
const mongoConstants = require('../constants/mongoConstants');
const books = require('../constants/books');

const adminRouter = express.Router();

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      // async await using IIFE
      debug('in admin router');
      (async function mongo() {
        let client;
        const collection = mongoConstants.collectionName;
        debug('before try');
        try {
          client = await MongoClient.connect(mongoConstants.mongoUrl, { useNewUrlParser: true });
          debug('connected to server');
          const db = client.db(mongoConstants.dbName);
          const mongoResponse = await db.collection(collection).insertMany(books);
          res.json(mongoResponse);
        } catch (err) {
          debug(err.stack);
        }
        if (client !== undefined) {
          client.close();
        }
      }());
    });
  return adminRouter;
}

module.exports = router;
