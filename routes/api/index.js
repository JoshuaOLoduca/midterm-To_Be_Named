const deleteMap = require('./user/modify/deleteMap');
const deletePlace = require('./user/modify/deletePlace');
const getMaps = require('./getMaps');
const userCollaborateAccess = require('./user/collaborateAccess');
const userFavourites = require('./user/favourites');
const userMaps = require('./user/maps');
const updateMap = require('./user/modify/updateMap');
const addPlace = require('./user/modify/updatePlaceToMap');
const postFavourites = require('./user/updateFavourites');
const isFavourites = require('./user/isFavourites')
const createMap = require('./user/modify/createMap');
const getCollaborators = require('./getCollaborators');
const deleteCollaborator = require('./user/modify/deleteCollaborator');
const addCollaboratorToMap = require('./user/modify/addCollaboratorToMap');


module.exports = function (router, db) {

  // DELETE /maps/:id
  // Deletes map
  deleteMap(router, db);

  // DELETE /places/:id
  // Takes in place id and deletes it
  deletePlace(router, db);

  // GET /maps
  // Gets list of all public maps
  //
  // GET /maps/mostViewed
  // Gets list of all public maps and sorts them by views
  //
  // GET /maps/mostLiked
  // Gets list of all public maps and sorts them by Favourites
  getMaps(router, db);

  // PATCH /maps/:id
  // Takes in body of map and updates values
  updateMap(router, db);

  // POST api/maps/:id/place
  // Takes in body of place info and adds it into map
  //
  // PATCH/maps/:id/place
  // Updates place with new info from body
  addPlace(router, db);

  // DELETE api/user/favourites
  // Takes in map id and looks at users cookie and deletes map
  postFavourites(router, db);

  // GET api/maps/:id/collaborators
  // gets all collaborators for map :id in url
  getCollaborators(router, db);

  // DELETE api/maps/:id/collaborators
  // takes in user ID and Map ID and removes user ID as collaborator
  deleteCollaborator(router, db);

  // POST api/maps/:id/collaborators
  // takes in user ID and Map ID and registers user ID as collaborator
  addCollaboratorToMap(router, db);

  // POST api/user/isFavourites
  // takes in body of user ID and map id and returns data IF they favourited the map
  isFavourites(router,db);

  // POST api/maps/create
  createMap(router, db);


  // User stuff
  userCollaborateAccess(router, db);
  userFavourites(router, db);
  userMaps(router, db);

  return router;
}

