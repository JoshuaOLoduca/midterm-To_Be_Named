module.exports = function(router, db) {
  //  Render Main website page
  router.get('/', (req, res) => {
    // Get user ID
    const userId = req.session.user_id;

    // Prepare user Id to be sent to EJS
      // so the nav bar renders right
    const templatevars = { userId };

    // Render / and send it to client
    res.render('index', templatevars);
  });
};
