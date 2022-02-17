module.exports = function (router, db) {
  //  render index page
  router.get('/', (req, res) => {
    const userId = req.session.user_id

    const templatevars = {
      userId
    }

    res.render('index', templatevars);
  });
}
