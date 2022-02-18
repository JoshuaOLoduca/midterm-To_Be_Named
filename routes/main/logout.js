module.exports = function(router, db) {
  // GET /users/logout
  // Deletes cookie and redirects to main page
  router.get('/logout', (req, res) => {
    // clear cookies
      // AKA logs em out
    req.session = null;

    // redirect to main page
    res.redirect('/');
  });
};
