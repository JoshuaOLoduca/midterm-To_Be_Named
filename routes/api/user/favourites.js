module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../helpers')(db);

  // GET /api/users/{user id}/maps/favourites
  // Get all favourite maps of user
  router.get('/users/:user_id/maps/favourites', (req, res) => {

    // Get user id from url
    const user_id = req.params.user_id;

    const queryString = `
      SELECT m.*
      FROM maps m
      JOIN user_favourites ul ON m.id = ul.map_id
      WHERE ul.user_id = $1;
      `;

    // Query database for favourite maps of user and returns array to of maps to client
    helper.tryReturnJson(res, queryString, [ user_id ]);
  });
};
