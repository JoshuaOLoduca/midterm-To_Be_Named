module.exports = function(router, db) {

  // GET /users/myMaps
  // Gets all maps of logged in user and renders the page for user
  router.get('/users/mymaps', (req, res) => {
    // Get logged in user
    const userId = req.session.user_id;

    // If not logged in, let them know
    if (!userId) return res.send('Login nerd');

    // Assemble EJS vars
    const templateVars = {
      userId
    };

    // Render their maps to user
    res.render('usersMaps', templateVars);
  });
};
