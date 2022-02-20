module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../../helpers')(db);

  // DELETE /api/maps{id}
  // Takes in nothing, deletes map if logged in user owns it
  router.delete('/maps/:id', (req, res) => {
    // Get logged in user
    const user_id = req.session.user_id;
    // Get map id from url
    const map_id = req.params.id;

    // Verify logged in user owns map
    // Helper will let them know if they dont have perms
    helper.checkIfOwner(res, user_id, map_id)
      // If they do, delete it
      .then(() => deleteMap())
      // General error catcher
      .catch(err => {
      // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });

    // Delete map from db
    function deleteMap() {
      // Add RETURNING so we can verify if there was anything deleted
      const deleteString = `
      DELETE
      FROM maps
      WHERE id = $1
        AND owner_id = $2
      RETURNING *;
      `;

      helper.tryDeleteEntity(res, deleteString, [map_id, user_id]);
    }
  });
};
