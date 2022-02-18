module.exports = function(router, db) {
  const helper = require('../../helpers')(db);

  router.delete('/maps/:id/collaborators', (req, res) => {
    // Initializing Vars
    const userToRemove = req.body.toRemoveId;
    const map_id = req.params.id;
    const user_id = req.session.user_id;

    // Checks to see if user owns map
    helper.checkIfOwner(res, user_id, map_id)
      // If they do, delete collaborator
      .then(() => deleteCollaborator())
      // catching server errors
      .catch(err => {
        console.log(err);
        // Letting user know we oopsied
        res.status(500).send('Something went wrong on our end');
      });

    // Delete Collaborator from FB
    function deleteCollaborator() {
      // Initializing Query
      const queryString = `
      DELETE
      FROM collaborators
      WHERE map_id = $1 AND user_id = $2
      RETURNING *;
      `;

      // Send Delete to db
      helper.tryDeleteEntity(res, queryString, [map_id, userToRemove]);
    }
  });
};
