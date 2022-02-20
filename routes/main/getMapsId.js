module.exports = function(router, db) {

  // GET /maps/{map ID}
  // Renders page for a specific map and sends it to the client
  router.get('/maps/:id', (req, res) => {

    // Get map id from url
    const id = req.params.id;
    // Get logged in user
    // Or set to 0 if no one is logged in
    const user_id = req.session.user_id || 0;

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

    // Query database for map details
    db.query(mapQueryString, [id])
      .then((response) => {
        // Get map details from db response
        const mapDetails = response.rows[0];

        // If map doesnt exist, throw an error
        if (!mapDetails) throw new Error('uhoh');

        // Get places for map
        db.query(mapPlacesQueryString, [mapDetails.id])
          .then(moreResponse => {
          // Get places from db query
            const PlacesData = moreResponse.rows;

            // Update views analytic
            updateMapViews(id);

            // Pass map and list of places to ejs, Render the pages and send it to the user
            res.render('map', {map: mapDetails, places: PlacesData, userId: user_id});

          });
      })
      .catch((err) => {
        if (err) {
          res.status(404).send('wrong stuff');
        }
      });
  });

  // Updates view count of map
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

