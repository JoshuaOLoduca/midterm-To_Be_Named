module.exports = function (router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../helpers')(db);

  router.get('/users/:user_id/maps/collaborate', (req, res) => {

    const {user_id} = req.params;

    const queryString = `
    SELECT m.*
    FROM maps m
    JOIN collaborators c ON c.map_id = m.id
    WHERE c.user_id = $1;
    `;

    helper.tryReturnJson(res, queryString, [ user_id ]);
  });

}
