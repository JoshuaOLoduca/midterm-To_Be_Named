const { Template } = require("ejs");

module.exports = function (router, db) {

  router.get('/maps', (req, res) => {
    const templatevars = {renderType: 'allMaps'}
    res.render("userReleventMaps", templatevars)
  });
};
