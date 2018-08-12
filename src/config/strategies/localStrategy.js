const passport = require('passport');
const { Strategy } = require('passport-local');

function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
      // username and password fields from index.ejs page
    }, (username, password, done) => {
      const user = {
        username, password
      };
      done(null, user);
    }
  ));
}

module.exports = localStrategy;
