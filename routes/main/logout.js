module.exports = function(router, db) {
  // GET /users/logout
  // Deletes users login cookie and redirects them to main page
  router.get('/logout', (req, res) => {
    // clear cookies
    req.session = null;

    // redirect to homepage
    res.redirect('/');
  });
};
