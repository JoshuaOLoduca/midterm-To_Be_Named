module.exports = function(router, db) {
  // GET /users/login
  // Sets user login to id in url
  // then redirects them to main page
  router.get('/login/:id', (req, res) => {
    // Set cookie to :id in url
    // Done for deving purpose
    req.session.user_id = req.params.id;

    // redirect to main page
    res.redirect('/');
  });
};
