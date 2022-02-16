module.exports = function(router, db){
  const helper = require('./helpers')(db);

  router.post('/maps/:id/collaborators', (req, res) => {

    const insertString = `
    INSERT INTO collaborators (user_id, map_id)
    VALUES ($1, $2)
    RETURNING *;
    `;
    const params = [
      req.body.id,
      req.body.map_id
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
  });
}
