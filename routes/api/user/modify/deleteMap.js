module.exports = function(router, db) {
  const helper = require('../../helpers')(db);

  // Deletes map from database
  router.delete('/maps/:id', (req, res) => {
    // Initializing vars
    const user_id = req.session.user_id;
    const map_id = req.params.id;

    // Checking to see if owner
    helper.checkIfOwner(res, user_id, map_id)
      // deleting map if user is owner
      .then(() => deleteMap())
      // Catch server errors
      .catch(err => {
        console.log(err);
        // let user know we oopsied
        res.status(500).send('Something went wrong on our end');
      });

    // Deletes map from db
    function deleteMap() {
      // Initializing delete query
      const deleteString = `
      DELETE
      FROM maps
      WHERE id = $1
        AND owner_id = $2
      RETURNING *;
      `;

      // Send delete query to database
      helper.tryDeleteEntity(res, deleteString, [map_id, user_id]);
    }
  });
};
