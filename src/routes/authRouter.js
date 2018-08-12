const express = require('express');
const debug = require('debug')('app:adminRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);

      // create user and authorize it by attaching user to subsequent requests
      // and redirect to new page
      req.login(req.body, () => {
        res.redirect('/auth/profile');
      });
    });

  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
