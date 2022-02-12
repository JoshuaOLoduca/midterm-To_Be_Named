module.exports = function(router, db) {
  // GET /users/login
  router.get('/login/:id', (req, res) => {
    // cookie credentials
    //req.session.user_id = req.params.id;

    // redirect to homepage
    res.redirect('/');
  });
}
