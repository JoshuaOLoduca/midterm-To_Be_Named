const deleteMap = require('./deleteMap');
const deletePlace = require('./deletePlace');

module.exports = function (router, db) {

  deleteMap(router, db);
  deletePlace(router, db);

  return router;
}

