const deleteMap = require('./deleteMap');
const deletePlace = require('./deletePlace');
const getMaps = require('./getMaps');
const userCollaborateAccess = require('./user/collaborateAccess');
const userFavourites = require('./user/favourites');
const userMaps = require('./user/maps');
const updateMap = require('./updateMap');
const addPlace = require('./addPlaceToMap');
const postFavourites = require('./user/postFavourites');

const createMap = require('./createMap');
const getCollaborators = require('./getCollaborators');
const deleteCollaborator = require('./deleteCollaborator');
const addCollaboratorToMap = require('./addCollaboratorToMap');


module.exports = function (router, db) {

  deleteMap(router, db);
  deletePlace(router, db);
  getMaps(router, db);
  updateMap(router, db);
  addPlace(router, db);
  postFavourites(router, db);
  getCollaborators(router, db);
  deleteCollaborator(router, db);
  addCollaboratorToMap(router, db);

  // POST api/maps/create
  createMap(router, db);


  // User stuff
  userCollaborateAccess(router, db);
  userFavourites(router, db);
  userMaps(router, db);

  return router;
}

