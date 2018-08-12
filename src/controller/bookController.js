const debug = require('debug')('app:bookController');
const mongoService = require('../repo/mongoService');

// using revealing mudule pattern
// in this we have a function which has a lot of functions in it.
// the main functions return objects which has the inner functions in it.
function bookController(nav) {
  function getAllBooks(req, res) {
    debug('Books listed');
    (async function f2() {
      const books = await mongoService.getAllBooks.mgetAllBooks();
      res.render('bookListView', {
        title: 'books',
        books,
        nav
      });
    }());
  }

  function getBookById(req, res) {
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
  }

  return {
    getAllBooks,
    getBookById
  };
}

module.exports = bookController;
