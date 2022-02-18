module.exports = function(router, db) {
  // GET /users/login
  // Renders view to client of all maps they can edit
  router.get('/users/collaborate', (req, res) => {
    // cookie credentials
    const userId = req.session.user_id;

    // If there is no userId, they arent logged in. let them know
    if (!userId) return res.send('Login nerd');

    // Initialize EJS vars
    const templateVars = {
      renderType: 'collaborator',
      userId
    };

    // Render users maps they can collaborate on
    // (Most of this is done with javascript on the client side)
    res.render('userReleventMaps', templateVars);
  });
};
