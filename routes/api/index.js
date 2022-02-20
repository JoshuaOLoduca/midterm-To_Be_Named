const deleteMap = require('./user/modify/deleteMap');
const deletePlace = require('./user/modify/deletePlace');
const getMaps = require('./getMaps');
const userCollaborateAccess = require('./user/collaborateAccess');
const userFavourites = require('./user/favourites');
const userMaps = require('./user/maps');
const editMap = require('./user/modify/editMap');
const editPlaceOfMap = require('./user/modify/editPlaceOfMap');
const postFavourites = require('./user/modify/updateFavourites');
const isFavourites = require('./user/isFavourites')
const getCollaborators = require('./getCollaborators');
const editMapCollaborators = require('./user/modify/editMapCollaborators');
const isCollaborator = require('./user/isCollaborator');

module.exports = function (router, db) {

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
    // Takes in body of map and updates values\
  // DELETE /maps/:id
    // Deletes map
  // POST api/maps/create
    // Adds new map to Database
  editMap(router, db);

  // POST api/maps/:id/place
    // Takes in body of place info and adds it into map
  // PATCH/maps/:id/place
    // Updates place with new info from body
  // DELETE /places/:id
    // Takes in place id and deletes it
  editPlaceOfMap(router, db);

  // DELETE api/user/favourites
  // Takes in map id and looks at users cookie and deletes map
  postFavourites(router, db);

  // GET api/maps/:id/collaborators
  // gets all collaborators for map :id in url
  getCollaborators(router, db);

  // POST api/maps/:id/collaborators
    // takes in user ID and Map ID and registers user ID as collaborator
  // DELETE api/maps/:id/collaborators
    // takes in user ID and Map ID and removes user ID as collaborator
  editMapCollaborators(router, db);

  // POST api/user/isFavourites
  // takes in body of user ID and map id and returns data IF they favourited the map
  isFavourites(router,db);

  //checks if user is a collaborator
  isCollaborator(router, db);


  // User stuff
  userCollaborateAccess(router, db);
  userFavourites(router, db);
  userMaps(router, db);

  return router;
}

