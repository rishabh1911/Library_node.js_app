const express = require('express');
const bookController = require('../controller/bookController');
const middleware = require('../controller/authoriseMiddleware');

const bookRouter = express.Router();

function router(nav) {
  const {
    getAllBooks, getBookById, insertBook, getInsertBookPage, deleteBook
  } = bookController(nav);
  const { authoriseMiddleWare } = middleware();

  // adding middleware to stop access to book before authentication
  bookRouter.use(authoriseMiddleWare);

  // All book Routes
  bookRouter.route('/')
    .get(getAllBooks);

  // added myBook in path as :id and addBook map to same route
  bookRouter.route('/myBook/:id')
    .get(getBookById)
    .post(deleteBook);

  bookRouter.route('/addBook')
    .get(getInsertBookPage)
    .post(insertBook);

  return bookRouter;
}

module.exports = router; // exporting function now
