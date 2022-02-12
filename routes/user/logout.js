module.exports = function(router, db) {
  // POST /users/logout
  router.post('/logout', (req, res) => {
    // clear cookies
    req.sessions = null;

    // redirect to homepage
    res.redirect('/');
  });
}
