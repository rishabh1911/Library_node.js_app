
function authorise() {
  async function authoriseMiddleWare(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    authoriseMiddleWare
  };
}

module.exports = authorise;
