module.exports = function(router, db) {

  router.get('/maps/:id', (req, res) => {

    const id = req.params.id;

    const mapQueryString = `
    SELECT *
    FROM maps
    WHERE id = $1;
    `;

    const mapPlacesQueryString = `
    SELECT p.*
    FROM places p
    WHERE map_id = $1;
    `;

    db.query(mapQueryString, [id])
      .then((response) => {
        const mapDetails = response.rows[0];

        db.query(mapPlacesQueryString, [mapDetails.id])
          .then(moreResponse => {
            const moarResult = moreResponse.rows;
            if (!mapDetails) throw new Error('uhoh');

            updateMapViews(id);
            res.render('map', {map: mapDetails, places: moarResult, userId: req.session.user_id});

          });
      })
      .catch((err) => {
        if (err) {
          res.status(404).send('wrong stuff');
        }
      });
  });

  function updateMapViews(mapId) {
    db.query(`
      UPDATE maps
      SET views = views + 1
      WHERE id = $1
      RETURNING id, views;
    `, [mapId])
      .then(response => {
        const result = response.rows[0];
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

