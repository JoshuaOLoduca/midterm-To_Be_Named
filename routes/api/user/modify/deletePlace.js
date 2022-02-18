module.exports = function(router, db) {
  const helper = require('../../helpers')(db);

  // Deletes place from map
  router.delete('/places/:id', (req, res) => {
    // Initializing Vars
    const place_id = req.params.id;
    const user_id = req.session.user_id;
    const checkRightsQuery = `
      SELECT *
      FROM maps m
      JOIN places p ON p.map_id = m.id
      JOIN collaborators c ON c.map_id = m.id
      WHERE p.id = $2 AND (m.owner_id = $1 OR c.user_id = $1);
    `;

    // Checking to see if user is owner or collaboratos
    helper.checkRights(res, checkRightsQuery, [user_id, place_id])
      // Delete place if they are
      .then(() => deletePlace())
      // Catch server errors
      .catch(err => {
        console.log(err);
        // Let user know we oopsied
        res.status(500).send('Something went wrong on our end');
      });

    // Deletes place
    function deletePlace() {
      // Initializing delete query
      // (Yeah, we sorta double check to see if they have rights. not efficient)
      const deleteString = `
      DELETE
      FROM places p
      WHERE p.id = (
        SELECT p2.id
        FROM places p2
        JOIN maps m
        ON m.id = p2.map_id
        JOIN collaborators c
        ON c.map_id = m.id
        WHERE p2.id = $1
        AND (c.user_id = $2 OR m.owner_id = $2)
        GROUP BY m.owner_id, p2.id
        )
        RETURNING *;
        `;

      // Try to delete place from Database
      helper.tryDeleteEntity(res, deleteString, [place_id, user_id]);
    }
  });
};
