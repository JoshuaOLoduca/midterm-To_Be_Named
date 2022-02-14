module.exports = function (router, db) {
  const helper = require('./helpers')(db);

  router.get('/maps', (req, res) => {
    const queryString = `
    SELECT *
    FROM maps
    WHERE public = true;
    `;

    helper.tryReturnJson(res, queryString)
  });
}
