const debug = require('debug')('app:adminController');

const mongoAuthService = require('../repo/mongoAuthService');
const mongoService = require('../repo/mongoService')();

function adminController() {
  async function addAdminAndDefaultBooks(req, res) {
    // async await using IIFE
    debug('in admin router');
    (async function f() {
      debug('Inside admin controller');
      await mongoService.insertFirstTime();
      debug('books added');
      const output = await mongoAuthService.addAdmin.mAddAdminUser();
      debug('admin added');
      res.json(output);
    }());
  }

  return {
    addAdminAndDefaultBooks
  };
}

module.exports = adminController;
