module.exports = function(router, db) {

  // GET /maps
  // Get list of all publicly available maps and renders the page for user
  router.get('/maps', (req, res) => {

    // Gets Logged in user
    const userId = req.session.user_id;

    // Passes vars to EJS
    const templatevars = {
      renderType: 'allMaps',
      userId
    };

    // Renders all maps and sends it to user
    res.render("userReleventMaps", templatevars);
  });
};
