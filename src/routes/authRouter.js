const express = require('express');
const debug = require('debug')('app:adminRoutes');
const mongoAuthService = require('../repo/mongoAuthService');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      // create user and authorize it by attaching user to subsequent requests
      // and redirect to new page

      const { username, password } = req.body;
      const user = { username, password };
      (async function saveUserToDb() {
        const savedUser = await mongoAuthService.mAddUser(user);
        req.login(savedUser, () => {
          res.redirect('/auth/profile');
        });
      }());
    });

  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
