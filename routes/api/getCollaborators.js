module.exports = function (router, db) {
  const helper = require('./helpers')(db);

  router.get('/maps/:id/collaborators', (req, res) => {
    const userId = req.session.user_id || 0;
    const mapId = req.params.id;

    const queryString = `
    SELECT user_id, name
    FROM collaborators c
    JOIN users u ON u.id = c.user_id
    WHERE map_id = $1 AND u.id != $2;
    `;

    helper.tryReturnJson(res, queryString, [mapId, userId])
  });
}
