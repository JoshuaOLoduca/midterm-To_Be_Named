module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../../helpers')(db);

  // POST /api/{id}/place
  // Takes in no body
  // adds place to map if logged in user has perms
  router.post('/maps/:id/place', (req, res) => {
    // Get logged in user
    const user_id = req.session.user_id;
    // Get map id from url
    const map_id = req.params.id;

    const checkRightsQuery = `
      SELECT c.user_id, c.map_id
      FROM collaborators c
      WHERE c.map_id = $2 AND c.user_id = $1
      UNION
      SELECT m.owner_id, m.id
      FROM maps m
      WHERE m.id = $2 AND m.owner_id = $1;
      `;

    // Check if user has rights for place
    // helper will let user know if they dont have perms
    helper.checkRights(res, checkRightsQuery, [user_id, map_id])
      // If they do, create it it
      .then(() => createPlace())
      // General Error Catcher
      .catch(err => {
        // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });

    // Update place with new values
    function createPlace() {
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

      // Insert place to db and return place to client
      helper.tryReturnJson(res, queryString, params);
    }
  });

  // PATCH /api/maps/{id}/place
  // Takes in no body
  // Updates place with new params if logged in user has perms
  router.patch('/maps/:id/place', (req, res) => {

    // Get logged in user
    const user_id = req.session.user_id;
    // Get map id from url
    const map_id = req.params.id;

    const checkRightsQuery = `
      SELECT c.user_id, c.map_id
      FROM collaborators c
      WHERE c.map_id = $2 AND c.user_id = $1
      UNION
      SELECT m.owner_id, m.id
      FROM maps m
      WHERE m.id = $2 AND m.owner_id = $1;
      `;

    // Check if user has rights for place
    // helper will let user know if they dont have perms
    helper.checkRights(res, checkRightsQuery, [user_id, map_id])
      // If they do, create it it
      .then(() => updatePlace())
      // General Error Catcher
      .catch(err => {
        // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });

    function updatePlace() {
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

      // Send update to database and return updated values
      helper.tryReturnJson(res, updateString, params);
    }
  });

  // DELETE /api/places/{id}
  // Takes in no params and deletes place from map if user has rights
  router.delete('/places/:id', (req, res) => {
    // Get Logged in user
    const user_id = req.session.user_id;
    // Get place if from url
    const place_id = req.params.id;

    const checkRightsQuery = `
      SELECT m.owner_id AS user_id, m.id AS map_id
      FROM maps m
      JOIN places p ON p.map_id = m.id
      WHERE p.id = $2 AND m.owner_id = $1
      UNION
      SELECT c.user_id, c.map_id
      FROM maps m
      JOIN places p ON p.map_id = m.id
      JOIN collaborators c ON c.map_id = m.id
      WHERE p.id = $2 AND c.user_id = $1;
    `;

    // Check if user has rights for place
    // helper will let user know if they dont have perms
    helper.checkRights(res, checkRightsQuery, [user_id, place_id])
      // If they do, delete it
      .then(() => deletePlace())
      // General Error Catcher
      .catch(err => {
        // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });

    function deletePlace() {
      const deleteString = `
        DELETE
        FROM places p
        WHERE p.id = $1
        RETURNING *;
        `;

      helper.tryDeleteEntity(res, deleteString, [place_id]);
    }
  });
};
