module.exports = function(router, db) {
  // Import helper and initialize it with the database connection
  const helper = require('../../helpers')(db);

  // DELETE /api/user/favourites
  // Takes in body of map ID
  // Removes map from users favourites
  router.delete('/user/favourites', (req, res) => {
    // Get Logged in user
    const user_id = req.session.user_id;
    // Get map id from body
    const map_id = req.body.id;

    // Verify they exist in our records
    // If they are not, helper class will let them know
    helper.checkIfUserExists(res, user_id)
      // if they do, remove map from favourites
      .then(() => deleteFavourite())
      // General Error catcher
      .catch(err => {
      // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });


    // Removed map from users favourites
    function deleteFavourite() {
      // Must have returning so we can verify if there was anything to delete
      const insertString = `
        DELETE FROM user_favourites
        WHERE map_id = $1 AND user_id = $2
        RETURNING *`;

      helper.tryDeleteEntity(res, insertString, [map_id, user_id]);
    }
  });

  // POST /api/user/favourites
  // Takes in body containing if of map to favourite
  // Adds map to logged in users favourites
  router.post('/user/favourites', (req, res) => {
    // Get logged in user
    const user_id = req.session.user_id;
    // Get map id from body
    const map_id = req.body.id;

    // Verify they exist in our records
    // If they are not, helper class will let them know
    helper.checkIfUserExists(res, user_id)
      // If they do, creat map in database
      .then(() => addFavourite())
      // General error catcher
      .catch(err => {
        // Log error to server console
        console.log(err);
        // Let user know the server oopsied
        res.status(500).send('Something went wrong on our end');
      });

    // Returns newly inserted favourite
    // Adds map to logged in users favourites
    function addFavourite() {
      const insertString = `
        INSERT INTO user_favourites(user_id, map_id)
        VALUES ($1, $2)
        RETURNING *;`;

      helper.tryReturnJson(res, insertString, [user_id, map_id]);
    }
  });
};


