const homePage = require('./homePage');
const login = require('./login');
const logout = require('./logout');
const allMaps = require('./maps');
const getMapsId = require('./getMapsId');
const favourites = require('./favourites');
const canEdit = require('./canEdit');
const usersCreatedMaps = require('./usersCreatedMaps');

module.exports = function(router, db) {

  // GET /
  // Renders the main page to the user
  homePage(router, db);

  // GET /maps/{map ID}
  // Renders page for a specific map and sends it to the client
  getMapsId(router, db);

  // GET /login/{user Id}
  // Logs in user by the id specified in the url
  // ITS BAD BECAUSE ITS FOR DEVING
  login(router, db);

  // GET /maps
  // Get list of all publicly available maps and renders the page for user
  allMaps(router, db);

  // GET /users/logout
  // Deletes users login cookie and redirects them to main page
  logout(router, db);

  // GET /users/favourites
  // Renders page of maps user has favourited
  favourites(router, db);

  // GET /users/collaborate
  // Gets maps user can edit places on
  canEdit(router, db);

  // GET /users/myMaps
  // Gets all maps of logged in user and renders the page for user
  usersCreatedMaps(router, db);

  return router;
};

