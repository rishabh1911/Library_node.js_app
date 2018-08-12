const passport = require('passport');
require('./strategies/localStrategy');

function passportconfig(app) {
  app.use(passport.initialize());
  // initialize does many things. like attach login function to request of posts etc.

  app.use(passport.session());

  // stores user in the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });


  // retrieves user from the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = passportconfig;
