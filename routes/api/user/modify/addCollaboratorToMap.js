module.exports = function(router, db){
  const helper = require('../../helpers')(db);

  router.post('/maps/:id/collaborators', (req, res) => {

    const user_id = req.session.user_id;
    const map_id = req.body.map_id;
    const userToAdd = req.body.id;

    const checkRightsQuery = `
    SELECT m.owner_id
    FROM maps m
    WHERE m.owner_id = $1 AND m.id = $2;
    `;

    db.query(checkRightsQuery, [user_id, map_id])
    .then(response => {
      const result = response.rows;
      if (!result.length) return res.status(403).send('You dont have rights')
      addCollaboratorToMap();
    })

    function addCollaboratorToMap() {
      const insertString = `
      INSERT INTO collaborators (user_id, map_id)
      VALUES ($1, $2)
      RETURNING *;
      `;
      const params = [
        userToAdd,
        map_id
      ]

      db.query(insertString, params)
      .then(result => {
        const queryString = `
        SELECT user_id, name, map_id
        FROM collaborators c
        JOIN users u ON u.id = c.user_id
        WHERE map_id = $2 AND u.id = $1
        GROUP BY user_id, name, map_id;
        `;

        const moarParams = [
          result.rows[0].user_id,
          req.body.map_id,
        ]

        helper.tryReturnJson(res, queryString, moarParams)
      })
      .catch(e => console.log(e))
    }

  });
}
