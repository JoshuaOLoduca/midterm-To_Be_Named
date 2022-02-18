
module.exports = function(router, db) {
  const helper = require("../../helpers")(db);

  // Takes in body of data for new map
  // and creates map registered to user
  router.post('/maps', (req, res) => {

    // Initialize Vars
    const user_id = req.session.user_id;
    const checkUserIsRegistered = `
    SELECT id
    FROM users
    WHERE id = $1;
    `;

    // Checker to see if user is registered in database
    helper.checkRights(res, checkUserIsRegistered, [user_id])
      // If they are registered, create map
      .then(() => createMap())
      // If we crash, let user know server had an oopsie
      .catch(err => {
        // Log err to server console
        console.log(err);
        res.status(500).send('Something went wrong on our end');
      });

    // Inserts map to DB
    function createMap() {
      // Initialize Vars
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

      // Send Insert to Database
      db.query(queryString, values)
        // On success, return data of created map
        .then((result) => {
          res.status(200).json(result.rows[0]);
        })
        // Otherwise, send error to client
      // (Maybe we shouldnt do that)
        .catch((err) => {
          console.log(err);
          res.json({ error: err.message});
        });
    }
  });

};
