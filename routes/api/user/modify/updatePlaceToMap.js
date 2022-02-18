module.exports = function(router, db) {
  const helper = require('../../helpers')(db);

  // Add place to map
  router.post('/maps/:id/place', (req, res) => {
    // Initialize Vars
    const user_id = req.session.user_id;
    const map_id = req.params.id;
    const checkRightsQuery = `
    SELECT *
    FROM maps m
    JOIN collaborators c ON c.map_id = m.id
    WHERE m.id = $2 AND (m.owner_id = $1 OR c.user_id = $1)
    `;

    // Check to see if user is owner or collaborator
    helper.checkRights(res, checkRightsQuery, [user_id, map_id])
      // If they are, add cplace to map
      .then(() => postPlace())
      // Catch server error
      .catch(err => {
        console.log(err);
        // Let user know we ucked Fup
        res.status(500).send('Something went wrong on our end');
      });

    // Add place to map
    function postPlace() {
      // Initialize Query String
      const queryString = `
      INSERT INTO places (longitude, latitude, title, description, img_url, map_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `;
      const params = [
        req.body.longitude,
        req.body.latitude,
        req.body.title,
        req.body.description,
        req.body.img_url,
        req.params.id
      ];

      // Add place to map
      // And return its data (assigned ID)
      helper.tryReturnJson(res, queryString, params);
    }
  });


  // Update Place
  router.patch('/maps/:id/place', (req, res) => {

    // Initialize Vars
    const map_id = req.params.id;
    const user_id = req.session.user_id;
    const checkRightsQuery = `
    SELECT *
    FROM maps m
    JOIN collaborators c ON c.map_id = m.id
    WHERE m.id = $2 AND (m.owner_id = $1 OR c.user_id = $1)
    `;

    // Check to see if user is owner or Collaborator
    helper.checkRights(res, checkRightsQuery, [user_id, map_id])
      // If they are, update Place
      .then(() => patchPlace())
      // Catch Server Errors
      .catch(err => {
        console.log(err);
        // Let user know Server Errored
        res.status(500).send('Something went wrong on our end');
      });

    // Update place with new info
    function patchPlace() {
      // Initialize Vars
      const params = [
        req.body.longitude,
        req.body.latitude,
        req.body.title,
        req.body.description,
        req.body.img_url,
        map_id,
        req.body.place
      ];
      const updateString = `
      UPDATE places
      SET longitude = $1,
      latitude = $2,
      title = $3,
      description = $4,
      img_url = $5
      WHERE map_id = $6 AND places.id = $7;`;

      // Update Place (doesnt return anything)
      helper.tryReturnJson(res, updateString, params);
    }
  });
};
