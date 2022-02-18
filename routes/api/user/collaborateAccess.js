module.exports = function(router, db) {
  const helper = require('../helpers')(db);

  // Gets all maps user can collaborate to
  router.get('/users/:user_id/maps/collaborate', (req, res) => {
    // Initialize Vars
    const user_id = req.params.user_id;
    const queryString = `
    SELECT m.*
    FROM maps m
    JOIN collaborators c ON c.map_id = m.id
    WHERE c.user_id = $1;
    `;

    // Return Json of maps user can edit
    helper.tryReturnJson(res, queryString, [ user_id ]);
  });

};
