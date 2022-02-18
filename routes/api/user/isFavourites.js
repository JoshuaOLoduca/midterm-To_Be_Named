module.exports = function(router, db) {
  const helper = require('../helpers')(db);

  router.post('/user/isFavourites', (req, res) => {

    const user_id = req.session.user_id;
    const map_id = req.body.id;

    const queryString = `
    SELECT *
    FROM user_favourites
    WHERE map_id = $2 AND user_id = $1;
    `;
    helper.tryReturnJson(res, queryString, [ user_id, map_id ]);
  });

};

