module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../../helpers')(db);

  // PATCH /api/maps/{id}
  // Takes in body of new map details
  // Updates existing map with new details
  router.patch('/maps/:id', (req, res) => {
    // If nothing in body, exit function and let user know they need to send in data
    if (!req.body) return res.status(400).send('No info in body');

    // Get logged in user
    const user_id = req.session.user_id;
    // Get map id from url
    const map_id = req.params.id;


    // Verifies logged in user owns the map
    // Helper will let  user know if user doesnt have perms
    helper.checkIfOwner(res, user_id, map_id)
      // On success, delete collaborator
      .then(() => updateMap())
      // General Error Catcher
      .catch(err => {
      // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });

    function updateMap() {
      // Initialize sql query paramater holder
      const parameters = [];
      // Start sql query
      let updateQuery = `UPDATE maps SET `;

      // Loop though body for map data
      // Set key as column name, and value as the new column value
      for (const key in req.body) {
        // Push new column value to params
        parameters.push(req.body[key]);

        // Add it to query string
        updateQuery += `
        ${key} = $${parameters.length},`;
      }

      // Remove trailing comma
      updateQuery = updateQuery.slice(0, -1);

      // Push map id to to parameters
      parameters.push(map_id);
      // Append where clause to sql query
      updateQuery += ` WHERE maps.id = $${parameters.length}`;

      // Send update to database and return newly updated values
      helper.tryReturnJson(res, updateQuery, parameters);
    }
  });

  // POST /maps/create
  // Takes in body of map object and inserts into database under logged in user
  router.post('/maps', (req, res) => {
    // Get logged in users id
    const user_id = req.session.user_id;

    // Verify they exist in our records
    // If they are not, helper class will let them know
    helper.checkIfUserExists(res, user_id)
      // If they do, creat map in database
      .then(() => createMap())
      // General error catcher
      .catch(err => {
        // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });

    // Inserts map into db and returns created map with its db assigned id
    function createMap() {
      const queryString = `
      INSERT INTO maps (owner_id, city, title, description, cover_img)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`;
      const values = [
        user_id,
        req.body.city,
        req.body.title,
        req.body.description,
        req.body.cover_img,
      ];

      // Send insert to database
      db.query(queryString, values)
        // If inserted, return map data as single object to client
        .then((result) => {
          res.status(200).json(result.rows[0]);
        })
        // General error catcher
        .catch((err) => {
          // Log error to server console
          console.log(err);
          // Let user know the server oopsied
          res.status(500).send('Something went wrong on our end');
        });
    }
  });

  // DELETE /api/maps{id}
  // Takes in nothing, deletes map if logged in user owns it
  router.delete('/maps/:id', (req, res) => {
    // Get logged in user
    const user_id = req.session.user_id;
    // Get map id from url
    const map_id = req.params.id;

    // Verify logged in user owns map
    // Helper will let them know if they dont have perms
    helper.checkIfOwner(res, user_id, map_id)
      // If they do, delete it
      .then(() => deleteMap())
      // General error catcher
      .catch(err => {
      // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });

    // Delete map from db
    function deleteMap() {
      // Add RETURNING so we can verify if there was anything deleted
      const deleteString = `
        DELETE
        FROM maps
        WHERE id = $1
          AND owner_id = $2
        RETURNING *;
      `;

      helper.tryDeleteEntity(res, deleteString, [map_id, user_id]);
    }
  });
};
