module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../../helpers')(db);

  // url
  // /api/maps/{id}/collaborators
  // Takes in a POST request with a body
  // Body contains user id that has the value of the id of user to add
  // And map_id set as the map to add the user to
  //
  // If successful, returns collaborators ID, Name and Map id they where added to
  router.post('/maps/:id/collaborators', (req, res) => {

    // extract info from cookie to get logged in user
    const user_id = req.session.user_id;
    // Extract info from body to get map id and user id
    const map_id = req.body.map_id;
    const userToAdd = req.body.id;

    // Check to see if the logged in user is owner of the map
    helper.checkIfOwner(res, user_id, map_id)
    // If they are, add sent user id as collaborator to map id
      .then(() => addCollaboratorToMap(userToAdd, map_id))
    // General error catcher
      // A more specific catch is in the helpers function
      .catch(err => {
      // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });

    // Adds user as collaborator and returns json of userid, name and map id to client
    function addCollaboratorToMap(userId, mapId) {
      const insertString = `
      INSERT INTO collaborators (user_id, map_id)
      VALUES ($1, $2)
      RETURNING *;
      `;
      const params = [
        userId,
        mapId
      ];

      // Attempt to add user to database
      db.query(insertString, params)
      //if successful, return user id, name and map id of collaborator
        .then(result => {
          const queryString = `
        SELECT user_id, name, map_id
        FROM collaborators c
        JOIN users u ON u.id = c.user_id
        WHERE map_id = $2 AND u.id = $1
        GROUP BY user_id, name, map_id;
        `;
          const moarParams = [
            result.rows[0].user_id,
            mapId,
          ];

          // Return json of list of collaborator to client
          helper.tryReturnJson(res, queryString, moarParams);
        })
        .catch(err => {
        // Log error to server console
          console.log(err);
          // Let user know the server oopsied
          res.status(500).send('Something went wrong on our end');
        });
    }

  });
};
