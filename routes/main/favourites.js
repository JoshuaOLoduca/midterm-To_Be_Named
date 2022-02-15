module.exports = function(router, db) {
  // GET /users/login
  router.get('/users/favourites', (req, res) => {
    // cookie credentials
    const userId = req.session.user_id;

    if (!userId) return res.send('Login nerd')

    const templateVars = {
      renderType: 'favourites',
      userId
    }

    console.log(templateVars)

    // redirect to homepage
    res.render('userReleventMaps', templateVars);
  });

  // redirect to proper spelling
  router.get('/users/favorites', (req, res) => res.redirect('/users/favourites'));
}
