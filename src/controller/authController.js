const debug = require('debug')('app:authController');
const mongoAuthService = require('../repo/mongoAuthService');

function authController(nav) {
  async function addUser(req, res) {
    debug(req.body);
    // create user and authorize it by attaching user to subsequent requests
    // and redirect to new page

    const { username, password } = req.body;
    const user = { username, password };
    (async function saveUserToDb() {
      const savedUser = await mongoAuthService.addUser.mAddUser(user);
      req.login(savedUser, () => {
        res.redirect('/books');
      });
    }());
  }

  async function getSignInPage(req, res) {
    debug('Sign In Get called...');
    res.render('signInView', {
      title: 'sign In',
      nav
    });
  }

  return {
    addUser,
    getSignInPage,
  };
}

module.exports = authController;
