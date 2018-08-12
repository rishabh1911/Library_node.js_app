const express = require('express');
const debug = require('debug')('app:adminRoutes');
const passport = require('passport');

const mongoAuthService = require('../repo/mongoAuthService');


const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      // create user and authorize it by attaching user to subsequent requests
      // and redirect to new page

      const { username, password } = req.body;
      const user = { username, password };
      (async function saveUserToDb() {
        const savedUser = await mongoAuthService.addUser.mAddUser(user);
        req.login(savedUser, () => {
          res.redirect('/auth/profile');
        });
      }());
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      debug('Sign In Get called...');
      res.render('signInView', {
        title: 'sign In',
        nav
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
    .get((req, res) => {
      if (req.user == null) {
        res.redirect('/');
      }
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
