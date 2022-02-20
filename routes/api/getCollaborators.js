module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('./helpers')(db);

  // GET /api/maps/{map id}/collaborators
  // Gets all collaborators for specific map
  router.get('/maps/:id/collaborators', (req, res) => {
    // Get logged in user, or set it to 0 if no one is logged in
    const userId = req.session.user_id || 0;
    // get map id from url
    const mapId = req.params.id;

    const queryString = `
      SELECT user_id, name, map_id
      FROM collaborators c
      JOIN users u ON u.id = c.user_id
      WHERE map_id = $1 AND u.id != $2
      GROUP BY user_id, name, map_id;
      `;

    // Returns id, name and map id of collaborators for mapId from url
    helper.tryReturnJson(res, queryString, [mapId, userId]);
  });
};
