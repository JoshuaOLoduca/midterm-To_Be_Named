module.exports = function(router, db) {
  // POST /users/logout
  router.get('/logout', (req, res) => {
    // clear cookies
    req.session = null;

    // redirect to homepage
    res.redirect('/');
  });
}
