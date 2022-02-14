const homePage = require('./homePage');
const login = require('./login');
const logout = require('./logout');
const createMaps = require('./createMaps');
const allMaps = require('./maps');
const getMapsId = require('./getMapsId')

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
  return router;
}

