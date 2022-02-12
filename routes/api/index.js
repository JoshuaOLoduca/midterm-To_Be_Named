const deleteMap = require('./deleteMap');

module.exports = function (router, db) {

  deleteMap(router, db)

  return router;
}

