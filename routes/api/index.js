const deleteMap = require('./deleteMap');
const deletePlace = require('./deletePlace');
const getMaps = require('./getMaps');
const usersReleventMapsRoutes = require('./usersReleventMapsRoutes');

module.exports = function (router, db) {

  deleteMap(router, db);
  deletePlace(router, db);
  getMaps(router, db);
  usersReleventMapsRoutes(router, db);

  return router;
}

