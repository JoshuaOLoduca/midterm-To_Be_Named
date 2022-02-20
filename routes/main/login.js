module.exports = function(router, db) {
  // GET /login/{user Id}
  // Logs in user by the id specified in the url
  // ITS BAD BECAUSE ITS FOR DEVING
  router.get('/login/:id', (req, res) => {
    // Set user cookie to id from url
    req.session.user_id = req.params.id;

    // Redirect to homepage
    res.redirect('/');
  });
};
