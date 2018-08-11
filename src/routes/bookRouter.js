const express = require('express');
const debug = require('debug')('app:adminRoutes');
const mongoService = require('../repo/mongoService');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      debug('Books listed');
      (async function f2() {
        const books = await mongoService.getAllBooks.mgetAllBooks();
        res.render('bookListView', {
          title: 'books',
          books,
          nav
        });
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      (async function f3() {
        debug('A');
        const book = await mongoService.getBookById.mGetBookbyId(id);
        debug(book);
        res.render('bookView', {
          title: 'books',
          book,
          nav
        });
      }());
    });

  return bookRouter;
}

module.exports = router; // exporting function now
