module.exports = function(router, db) {
  const helper = require('../helpers')(db);

  // Gets all favourites of user
  router.get('/users/:user_id/maps/favourites', (req, res) => {
    // Initialize Vars
    const user_id = req.params.user_id;
    const queryString = `
    SELECT m.*
    FROM maps m
    JOIN user_favourites ul ON m.id = ul.map_id
    WHERE ul.user_id = $1;
    `;

    // Return Json of all favourites of user
    helper.tryReturnJson(res, queryString, [ user_id ]);
  });
};
