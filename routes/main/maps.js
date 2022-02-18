module.exports = function(router, db) {

  // GET /maps
  // Redirects user to all maps page
  // User then ajax requests for all public maps
  // and inserts them into page
  router.get('/maps', (req, res) => {

    // Initialize Vars
    const userId = req.session.user_id;

    // Initialize Vars for EJS
    const templatevars = {
      renderType: 'allMaps',
      userId
    };

    // Render /maps with vars and sends it to the client
    res.render("userReleventMaps", templatevars);
  });
};
