module.exports = function (router, db) {

  router.get('/maps/:id', (req, res) => {

    const id = req.params.id

    const queryString = `
    SELECT maps.id
    FROM maps
    WHERE id = $1;
    `;

    db.query(queryString, [id])
      .then((response) => {
        const result = response.rows[0]
        if (result) res.render('map');
      })
      .catch((err) => { if (err) {
        res.status(404).send('wrong stuff');
      }
      });
  });
};
