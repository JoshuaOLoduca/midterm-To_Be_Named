module.exports = function(router, db) {
  // GET /users/login
  router.get('/users/favourites', (req, res) => {
    // cookie credentials
    const userId = req.session.user_id;

    // If there is no userId, they arent logged in. let them know
    if (!userId) return res.send('Login nerd');

    // Initialize EJS vars
    const templateVars = {
      renderType: 'favourites',
      userId
    };

    // Render users maps they have Favourited
      // (Most of this is done with javascript on the client side)
    res.render('userReleventMaps', templateVars);
  });

  // redirect to proper spelling
  router.get('/users/favorites', (req, res) => res.redirect('/users/favourites'));
};
