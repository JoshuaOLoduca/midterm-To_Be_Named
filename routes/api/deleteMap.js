module.exports = function (router, db) {
  const helper = require('./helpers')(db);

  //  render index page
  router.delete('/maps/:id', (req, res) => {
    const {owner_id} = req.body;
    const mapId = req.params.id
    const deleteString = `
    DELETE
    FROM maps
    WHERE id = $1
      AND owner_id = $2
    RETURNING *;
    `;

    helper.tryDeleteEntity(res, deleteString, [mapId, owner_id])
  });
}
