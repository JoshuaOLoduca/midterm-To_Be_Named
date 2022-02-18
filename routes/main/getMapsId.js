module.exports = function(router, db) {

  // Renders page for a specific map
  router.get('/maps/:id', (req, res) => {
    // Initialize Vars
    const id = req.params.id;
    const user_id = req.session.user_id || 0;


    // Initialize map details Query

    const mapQueryString = `
    SELECT *
    FROM maps
    WHERE id = $1;
    `;
    // Initialize Places that belong to map Query
    const mapPlacesQueryString = `
    SELECT p.*
    FROM places p
    WHERE map_id = $1;
    `;

    // Get Map details
    db.query(mapQueryString, [id])
      .then((response) => {
        // Set mapDetails to data recieved
        const mapDetails = response.rows[0];

        // If there is no map details, we throw an error
        if (!mapDetails) throw new Error('uhoh');

        // Sub promise so we can retain mapDetails in scope
        db.query(mapPlacesQueryString, [mapDetails.id])
          .then(moreResponse => {
            // Set places data to data recieved
            const placesDetails = moreResponse.rows;

            // Update analytics
            updateMapViews(id);
            // Render map page to user
            res.render('map', {map: mapDetails, places: moarResult, userId: user_id});
          });
      })
      // If map doesnt exist, let user know
      .catch((err) => {
        if (err) {
          res.status(404).send('wrong stuff, Map doesnt exist');
        }
      });
  });

  // Views analytics
  function updateMapViews(mapId) {
    // Update Database views count
    db.query(`
      UPDATE maps
      SET views = views + 1
      WHERE id = $1
      RETURNING id, views;
    `, [mapId])
      .then(response => {
        const result = response.rows[0];
        // Log to server map id and its new views
        console.log(result);
      })
      // Catch error and let server know
      .catch(err => {
        console.log(err);
      });
  }
};

