const deleteMap = require('./deleteMap');
const deletePlace = require('./deletePlace');
const getMaps = require('./getMaps');

module.exports = function (router, db) {

  deleteMap(router, db);
  deletePlace(router, db);
  getMaps(router, db);

  return router;
}

