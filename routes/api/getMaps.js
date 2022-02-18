module.exports = function(router, db) {
  const helper = require('./helpers')(db);

  // Gets all public maps
  router.get('/maps', (req, res) => {
    const queryString = `
    SELECT *
    FROM maps
    WHERE public = true;
    `;

    // Returns all public maps
    helper.tryReturnJson(res, queryString);
  });

  // Gets all public maps
  // And sorts them by views DESC
  router.get('/maps/mostViewed', (req, res) => {
    const queryString = `
    SELECT *
    FROM maps
    WHERE public = true
    ORDER BY views DESC;
    `;

    // Returns all public maps
    // Sorted by views
    helper.tryReturnJson(res, queryString);
  });

  // Gets all public maps
  // And sorts them by favourites DESC
  // (I know it says likes, but we didnt implement that)
  router.get('/maps/mostLiked', (req, res) => {
    const queryString = `
    SELECT m.*, COUNT(uf) as likes
    FROM maps m
    JOIN user_favourites uf ON uf.map_id = m.id
    WHERE public = true
    GROUP BY m.id
    ORDER BY COUNT(uf) DESC;
    `;

    // Returns all public maps
    // Sorted by Favourites
    helper.tryReturnJson(res, queryString);
  });
};
