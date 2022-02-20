module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../helpers')(db);

  // GET /api/users/{user id}/maps
  // Gets maps made by user
  router.get('/users/:user_id/maps', (req, res) => {

    // Get user id from url
    const {user_id} = req.params;

    const queryString = `
      SELECT *
      FROM maps m
      WHERE m.owner_id = $1
      ORDER BY m.id;
      `;

    // Returns list of maps made by user
    helper.tryReturnJson(res, queryString, [ user_id ]);
  });
};
