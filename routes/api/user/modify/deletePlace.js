module.exports = function (router, db) {
  const helper = require('../../helpers')(db);

  //  render index page
  router.delete('/places/:id', (req, res) => {
    const place_id = req.params.id
    const user_id = req.session.user_id;

    const checkRightsQuery = `
      SELECT *
      FROM maps m
      JOIN places p ON p.map_id = m.id
      JOIN collaborators c ON c.map_id = m.id
      WHERE p.id = $2 AND (m.owner_id = $1 OR c.user_id = $1);
    `;

    helper.checkRights(res, checkRightsQuery, [user_id, place_id])
    .then(() => deletePlace())
    .catch(err => {
      console.log(err);
      res.status(500).send('Something went wrong on our end')
    });

    function deletePlace() {
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

        helper.tryDeleteEntity(res, deleteString, [place_id, user_id])
      }
  });
}
