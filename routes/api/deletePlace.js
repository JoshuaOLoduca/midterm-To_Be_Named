module.exports = function (router, db) {
  //  render index page
  router.delete('/places/:id', (req, res) => {
    const {user_id} = req.body;
    const place_id = req.params.id
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
    db.query(deleteString, [place_id, user_id])
      .then(response => {
        const result = response.rows[0];
        console.log(result);
        if (result) return res.status(200).send();
        res.status(404).send("Nothing there kiddo");
      })
      .catch(err => console.log(err));
  });
}
