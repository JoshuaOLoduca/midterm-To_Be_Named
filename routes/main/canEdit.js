module.exports = function(router, db) {

  // GET /users/collaborate
  // Gets maps user can edit places on
  router.get('/users/collaborate', (req, res) => {
    // Get logged in user
    const userId = req.session.user_id;

    // If they arent logged in, tell them too
    if (!userId) return res.send('Login nerd');

    // Assemble EJS vars
    const templateVars = {
      renderType: 'collaborator',
      userId
    };

    // Render page of maps user can edit places on
    res.render('userReleventMaps', templateVars);
  });
};
