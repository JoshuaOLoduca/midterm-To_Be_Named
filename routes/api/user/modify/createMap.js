
module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require("../../helpers")(db);

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
        console.log(err);
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
          console.log(err);
          res.status(500).send('Something went wrong on our end');
        });
    }
  });

};
