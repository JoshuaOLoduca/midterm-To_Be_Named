module.exports = function(router, db) {
  // GET /users/login
  router.get('/users/mymaps', (req, res) => {
    // cookie credentials
    const userId = req.session.user_id;

    if (!userId) return res.send('Login nerd')

    const templateVars = {
      userId
    }

    // redirect to homepage
    res.render('usersMaps', templateVars);
  });
}
