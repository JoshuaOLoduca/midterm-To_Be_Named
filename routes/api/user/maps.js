module.exports = function (router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../helpers')(db);

  router.get('/users/:user_id/maps', (req, res) => {

    const {user_id} = req.params;

    const queryString = `
    SELECT *
    FROM maps m
    WHERE m.owner_id = $1
    ORDER BY m.id;
    `;

    helper.tryReturnJson(res, queryString, [ user_id ]);
  });
}
