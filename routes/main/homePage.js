module.exports = function(router, db) {
  // GET /
  // Renders the main page to the user
  router.get('/', (req, res) => {
    // Get logged in user (if there is one)
    const userId = req.session.user_id;

    // Pass it to ejs
    const templatevars = {
      userId
    };

    // Render main page and send it to user
    res.render('index', templatevars);
  });
};
