const { Template } = require("ejs");

module.exports = function (router, db) {

  router.get('/maps', (req, res) => {

    const userId = req.session.user_id

    const templatevars = {
      renderType: 'allMaps',
      userId
    }
    res.render("userReleventMaps", templatevars)
  });
};
