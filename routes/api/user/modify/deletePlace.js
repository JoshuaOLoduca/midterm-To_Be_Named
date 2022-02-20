module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../../helpers')(db);

  // DELETE /api/places/{id}
  // Takes in no params and deletes place from map if user has rights
  router.delete('/places/:id', (req, res) => {
    // Get Logged in user
    const user_id = req.session.user_id;
    // Get place if from url
    const place_id = req.params.id;

    const checkRightsQuery = `
      SELECT m.owner_id AS user_id, m.id AS map_id
      FROM maps m
      JOIN places p ON p.map_id = m.id
      WHERE p.id = $2 AND m.owner_id = $1
      UNION
      SELECT c.user_id, c.map_id
      FROM maps m
      JOIN places p ON p.map_id = m.id
      JOIN collaborators c ON c.map_id = m.id
      WHERE p.id = $2 AND c.user_id = $1;
    `;

    // Check if user has rights for place
    // helper will let user know if they dont have perms
    helper.checkRights(res, checkRightsQuery, [user_id, place_id])
      // If they do, delete it
      .then(() => deletePlace())
      // General Error Catcher
      .catch(err => {
        // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });

    function deletePlace() {
      const deleteString = `
        DELETE
        FROM places p
        WHERE p.id = $1
        RETURNING *;
        `;

      helper.tryDeleteEntity(res, deleteString, [place_id]);
    }
  });
};
