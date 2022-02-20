module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../helpers')(db);

  // GET /api/users/{user Id}/maps/collaborate
  // Gets all maps user can edit
  router.get('/users/:user_id/maps/collaborate', (req, res) => {

    // Get user id from url
    const user_id = req.params.user_id;

    const queryString = `
      SELECT m.*
      FROM maps m
      JOIN collaborators c ON c.map_id = m.id
      WHERE c.user_id = $1;
      `;

    // Query database for maps user can edit and return array to client
    helper.tryReturnJson(res, queryString, [ user_id ]);
  });

};
