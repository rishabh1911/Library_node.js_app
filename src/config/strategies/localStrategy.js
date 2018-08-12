const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:localStrategy');

const mongoAuthService = require('../../repo/mongoAuthService');

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
      debug(user);
      (async function validateUser() {
        const userFromDB = await mongoAuthService.findUser.mFindUserByUserName({ username });
        debug(userFromDB);
        if (userFromDB == null) { // user is not there
          done(null, false);
        }
        if (userFromDB.password === password) { // wrong password
          debug('user Authorized.');
          done(null, user);
        } else {
          done(null, false);
        }
      }());
    }
  ));
}

module.exports = localStrategy;
