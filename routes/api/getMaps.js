module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('./helpers')(db);

  // GET /api/maps
  // Gets all public maps
  router.get('/maps', (req, res) => {
    const queryString = `
      SELECT *
      FROM maps
      WHERE public = true;
      `;

    // Get all public maps and return list of maps to client
    helper.tryReturnJson(res, queryString);
  });

  // GET /api/maps/mostViewed
  // Gets all public maps and sorts them by views
  router.get('/maps/mostViewed', (req, res) => {
    const queryString = `
      SELECT *
      FROM maps
      WHERE public = true
      ORDER BY views DESC;
      `;

    // queries db and returns list of maps sorted by views
    helper.tryReturnJson(res, queryString);
  });

  // GET /api/maps/mostLiked
  // Gets all public maps and sorts them by favourite count
  router.get('/maps/mostLiked', (req, res) => {
    const queryString = `
      SELECT m.*, COUNT(uf) as likes
      FROM maps m
      JOIN user_favourites uf ON uf.map_id = m.id
      WHERE public = true
      GROUP BY m.id
      ORDER BY COUNT(uf) DESC;
      `;

    // queries db and returns list of maps sorted by favourites
    helper.tryReturnJson(res, queryString);
  });
};
