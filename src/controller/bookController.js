const debug = require('debug')('app:bookController');
const mongoService = require('../repo/mongoService')();

// using revealing mudule pattern
// in this we have a function which has a lot of functions in it.
// the main functions return objects which has the inner functions in it.
function bookController(nav) {
  function getAllBooks(req, res) {
    debug('Books listed');
    (async function f2() {
      const books = await mongoService.getAllBooks();
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
      const book = await mongoService.getBookbyId(id);
      debug(book);
      res.render('bookView', {
        title: 'books',
        book,
        nav
      });
    }());
  }

  async function insertBook(req, res) {
    const {
      title, genre, author, read
    } = req.body;
    const book = {
      title, genre, author, read
    };
    (async function addBookToDB() {
      const savedBook = await mongoService.insertBook(book);
      debug(savedBook);
      res.redirect('/books');
    }());
  }

  function getInsertBookPage(req, res) {
    res.render('bookAddView', {
      title: 'Add Book',
      nav
    });
  }

  return {
    getAllBooks,
    getBookById,
    insertBook,
    getInsertBookPage
  };
}

module.exports = bookController;
