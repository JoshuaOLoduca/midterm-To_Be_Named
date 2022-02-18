module.exports = function(router, db) {
  // GET /users/users/myMaps
  // If user is logged in, show them all their maps
  router.get('/users/mymaps', (req, res) => {
    // cookie credentials
    const userId = req.session.user_id;

    // Redirects user if they arent logged in
    if (!userId) return res.send('Login nerd');

    // Prepare EJS vars
    const templateVars = { userId };

    // Render users map page with vars
      // then send it to client
    res.render('usersMaps', templateVars);
  });
};
