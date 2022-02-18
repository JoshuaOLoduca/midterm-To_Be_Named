module.exports = function (router, db) {
  const helper = require('../helpers')(db);

  router.post('/user/isCollaborator', (req, res) => {

    const user_id = req.session.user_id
    const map_id = req.body.id

    const queryString = `
    SELECT c.user_id, c.map_id
    FROM collaborators c
    WHERE map_id = $2 AND user_id = $1
    UNION
    SELECT m.owner_id, m.id
    FROM maps m
    WHERE m.id = $2 AND m.owner_id = $1;
    `
    helper.tryReturnJson(res, queryString, [ user_id, map_id ]);
  });

};
