const passport = require('passport');

function passportconfig(app) {
  app.use(passport.initialize());
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
