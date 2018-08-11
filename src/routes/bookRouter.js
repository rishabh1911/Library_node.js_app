const express = require('express');
const debug = require('debug')('app:adminRoutes');
const books = require('../constants/books');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      debug('Books listed');
      res.render('bookListView', {
        title: 'books',
        books,
        nav
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('bookView', {
        title: 'books',
        book: books[id],
        nav
      });
    });

  return bookRouter;
}

module.exports = router; // exporting function now
