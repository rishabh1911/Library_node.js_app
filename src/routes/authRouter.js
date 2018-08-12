const express = require('express');
const passport = require('passport');

const authController = require('../controller/authController');


const authRouter = express.Router();

function router(nav) {
  const { addUser, getSignInPage } = authController(nav);

  authRouter.route('/signUp')
    .post(addUser);

  authRouter.route('/signIn')
    .get(getSignInPage)
    .post(passport.authenticate('local', {
      successRedirect: '/books',
      failureRedirect: '/'
    }));

  return authRouter;
}

module.exports = router;
