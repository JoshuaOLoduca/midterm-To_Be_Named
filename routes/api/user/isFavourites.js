module.exports = function(router, db) {
  const helper = require('../helpers')(db);

  // Takes in map ID from body to see if user
  // has favourited Map
  router.post('/user/isFavourites', (req, res) => {
    // Initializing Vars
    const user_id = req.session.user_id;
    const map_id = req.body.id;
    const queryString = `
    SELECT *
    FROM user_favourites
    WHERE map_id = $2 AND user_id = $1;
    `;

    // Return map_id and user_id of favourite
    helper.tryReturnJson(res, queryString, [ user_id, map_id ]);
  });

};

