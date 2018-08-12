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
      debug('Inside get book by Id');
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

  function deleteBook(req, res) {
    const { id } = req.params;
    (async function deleteBookFromDB() {
      debug('delete Book');
      const book = await mongoService.deleteBookbyId(id);
      debug(book);
      res.redirect('/books');
    }());
  }

  return {
    getAllBooks,
    getBookById,
    insertBook,
    getInsertBookPage,
    deleteBook
  };
}

module.exports = bookController;
