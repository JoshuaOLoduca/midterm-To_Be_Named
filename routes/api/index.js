const deleteMap = require('./deleteMap');
const deletePlace = require('./deletePlace');
const getMaps = require('./getMaps');
const userCollaborateAccess = require('./user/collaborateAccess');
const userFavourites = require('./user/favourites');
const userMaps = require('./user/maps');
const addPlace = require('./addPlaceToMap');
module.exports = function (router, db) {

  deleteMap(router, db);
  deletePlace(router, db);
  getMaps(router, db);
  addPlace(router, db);
  // User stuff
  userCollaborateAccess(router, db);
  userFavourites(router, db);
  userMaps(router, db);

  return router;
}

