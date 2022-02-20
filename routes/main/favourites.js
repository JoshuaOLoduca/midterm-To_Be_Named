module.exports = function(router, db) {
  // GET /users/favourites
  // Renders page of maps user has favourited
  router.get('/users/favourites', (req, res) => {
    // Get logged in user
    const userId = req.session.user_id;

    // If they arent logged in, tell them to
    if (!userId) return res.send('Login nerd');

    // Assemble EJS vars
    const templateVars = {
      renderType: 'favourites',
      userId
    };


    // Render and show the logged in users favourite maps
    res.render('userReleventMaps', templateVars);
  });

  // redirect to proper spelling
  router.get('/users/favorites', (req, res) => res.redirect('/users/favourites'));
};
