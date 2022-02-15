const homePage = require('./homePage');
const login = require('./login');
const logout = require('./logout');
const createMaps = require('./createMaps');
const allMaps = require('./maps');
const getMapsId = require('./getMapsId')
const favourites = require('./favourites')
const canEdit = require('./canEdit')
const usersCreatedMaps = require('./usersCreatedMaps');

module.exports = function (router, db) {

  //  render index page
  homePage(router, db);
  getMapsId(router, db)
  // GET /users/login
  login(router, db);
  allMaps(router, db);

  // POST /users/logout
  logout(router, db);

  // POST /maps/create
  createMaps(router, db);

  // GET /users/favourites
  favourites(router, db);

  // GET /users/collaborate
  canEdit(router, db);

  // GET /users/myMaps
  usersCreatedMaps(router, db);
  return router;
}

