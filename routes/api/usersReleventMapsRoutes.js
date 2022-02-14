module.exports = function (router, db) {
  router.get('/users/:user_id/maps/favourites', (req, res) => {

    const {user_id} = req.params;

    const queryString = `
    SELECT m.*
    FROM maps m
    JOIN user_likes ul ON m.id = ul.map_id
    WHERE ul.user_id = $1;
    `;

    db.query(queryString, [ user_id ])
      .then(response => {
        const result = response.rows;
        if (result) return res.status(200).json(result);

        res.status(500).send("Something went wrong on our end");
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong on our end");
      });
  });
}
