module.exports = function (router, db) {
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
    db.query(deleteString, [mapId, owner_id])
      .then(response => {
        const result = response.rows[0];
        console.log(result);
        if (result) return res.status(200).send();
        res.status(404).send("Nothing there kiddo");
      })
      .catch(err => console.log(err));
  });
}
