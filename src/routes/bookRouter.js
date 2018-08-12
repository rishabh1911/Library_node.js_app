const express = require('express');
const bookController = require('../controller/bookController');
const middleware = require('../controller/authoriseMiddleware');

const bookRouter = express.Router();

function router(nav) {
  const { getAllBooks, getBookById } = bookController(nav);
  const { authoriseMiddleWare } = middleware();

  // adding middleware to stop access to book before authentication
  bookRouter.use(authoriseMiddleWare);

  // All book Routes
  bookRouter.route('/')
    .get(getAllBooks);

  bookRouter.route('/:id')
    .get(getBookById);

  return bookRouter;
}

module.exports = router; // exporting function now
