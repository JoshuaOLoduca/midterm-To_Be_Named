const homePage = require('./homePage');
const login = require('./login');
const logout = require('./logout');
const allMaps = require('./maps');
const getMapsId = require('./getMapsId');
const favourites = require('./favourites');
const canEdit = require('./canEdit');
const usersCreatedMaps = require('./usersCreatedMaps');

module.exports = function(router, db) {

  // All routes here renders a page

  // GET /
  homePage(router, db);

  // GET /maps/:id
  getMapsId(router, db);

  // GET /users/login
  login(router, db);

  // GET /maps
  allMaps(router, db);

  // GET /users/logout
  logout(router, db);

  // GET /users/favourites
  favourites(router, db);

  // GET /users/collaborate
  canEdit(router, db);

  // GET /users/myMaps
  usersCreatedMaps(router, db);
  return router;
};

