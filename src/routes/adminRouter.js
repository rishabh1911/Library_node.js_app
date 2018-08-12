const express = require('express');
const debug = require('debug')('app:adminRoutes');
const mongoService = require('../repo/mongoService')();

const adminRouter = express.Router();

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      // async await using IIFE
      debug('in admin router');
      (async function f() {
        const output = await mongoService.insertFirstTime();
        debug(output);
        res.json(output);
      }());
    });
  return adminRouter;
}

module.exports = router;
