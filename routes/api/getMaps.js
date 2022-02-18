module.exports = function(router, db) {
  const helper = require('./helpers')(db);

  router.get('/maps', (req, res) => {
    const queryString = `
    SELECT *
    FROM maps
    WHERE public = true;
    `;

    helper.tryReturnJson(res, queryString);
  });

  router.get('/maps/mostViewed', (req, res) => {
    const queryString = `
    SELECT *
    FROM maps
    WHERE public = true
    ORDER BY views DESC;
    `;

    helper.tryReturnJson(res, queryString);
  });

  router.get('/maps/mostLiked', (req, res) => {
    const queryString = `
    SELECT m.*, COUNT(uf) as likes
    FROM maps m
    JOIN user_favourites uf ON uf.map_id = m.id
    WHERE public = true
    GROUP BY m.id
    ORDER BY COUNT(uf) DESC;
    `;

    helper.tryReturnJson(res, queryString);
  });
};
