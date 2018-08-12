const express = require('express');

const { addAdminAndDefaultBooks } = require('../controller/adminController')();

const adminRouter = express.Router();

function router() {
  adminRouter.route('/')
    .get(addAdminAndDefaultBooks);
  return adminRouter;
}

module.exports = router;
