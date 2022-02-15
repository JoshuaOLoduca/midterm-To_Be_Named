module.exports = function(router, db) {
  // GET /users/login
  router.get('/users/collaborate', (req, res) => {
    // cookie credentials
    const userId = req.session.user_id;

    if (!userId) return res.send('Login nerd')

    const templateVars = {
      renderType: 'collaborator',
      userId
    }

    console.log(templateVars)

    // redirect to homepage
    res.render('userReleventMaps', templateVars);
  });
}
