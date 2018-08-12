const express = require('express');
const bookController = require('../controller/bookController');

const bookRouter = express.Router();

function router(nav) {
  const { getAllBooks, getBookById } = bookController(nav);
  // adding middleware to stop access to book before authentication
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  // All book Routes
  bookRouter.route('/')
    .get(getAllBooks);

  bookRouter.route('/:id')
    .get(getBookById);

  return bookRouter;
}

module.exports = router; // exporting function now
