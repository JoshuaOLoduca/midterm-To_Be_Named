module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../helpers')(db);

  // POST /api/user/isCollaborator
  // Takes in body of map id to check access for
  // Check to see if logged in user is collaborator for map
  router.post('/user/isCollaborator', (req, res) => {

    // Get logged in user
    const user_id = req.session.user_id;
    // get map ID from body
    const map_id = req.body.id;

    const queryString = `
      SELECT c.user_id, c.map_id
      FROM collaborators c
      WHERE map_id = $2 AND user_id = $1
      UNION
      SELECT m.owner_id, m.id
      FROM maps m
      WHERE m.id = $2 AND m.owner_id = $1;
      `;
    // Returns empty array if user doesnt have access (array.length is falsy)
    // or an array with 1 entry if user does have perms (array.length is truethy)
    helper.tryReturnJson(res, queryString, [ user_id, map_id ]);
  });

};
