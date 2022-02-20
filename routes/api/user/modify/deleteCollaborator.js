module.exports = function (router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../../helpers')(db);

  router.delete('/maps/:id/collaborators', (req, res) => {
    // const userId = req.session.user_id;
    const userToRemove = req.body.toRemoveId;
    const map_id = req.params.id;
    // to be used to verify editing rights
    const user_id = req.session.user_id;

    helper.checkIfOwner(res, user_id, map_id)
    .then(() => deleteCollaborator())
    .catch(err => {
      console.log(err);
      res.status(500).send('Something went wrong on our end')
    });

    function deleteCollaborator() {
      const queryString = `
      DELETE
      FROM collaborators
      WHERE map_id = $1 AND user_id = $2
      RETURNING *;
      `;

      helper.tryDeleteEntity(res, queryString, [map_id, userToRemove])
    }
  });
}
