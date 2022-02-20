module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../helpers')(db);

  // POST /api/user/isFavourites
  // Takes in body of map id
  // Checks if user has map in their favourites
  router.post('/user/isFavourites', (req, res) => {

    // Get logged in user
    const user_id = req.session.user_id;
    // Get map id from body
    const map_id = req.body.id;

    const queryString = `
      SELECT *
      FROM user_favourites
      WHERE map_id = $2 AND user_id = $1;
      `;

    // Returns empty array if user doesnt have map favourited (array.length is falsy)
    // or an array with 1 entry map IS favourited  (array.length is truethy)
    helper.tryReturnJson(res, queryString, [ user_id, map_id ]);
  });

};

