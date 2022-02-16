module.exports = function (router, db) {
  const helper = require('./helpers')(db);

  router.delete('/maps/:id/collaborators', (req, res) => {
    // const userId = req.session.user_id;
    const userToRemove = req.body.toRemoveId;
    const mapId = req.params.id;

    const queryString = `
    DELETE
    FROM collaborators
    WHERE map_id = $1 AND user_id = $2
    RETURNING *;
    `;

    helper.tryDeleteEntity(res, queryString, [mapId, userToRemove])
  });
}
