module.exports = function(router, db) {
  const helper = require('../../helpers')(db);

  // Deletes favourite from users favourites
  router.delete('/user/favourites', (req, res) => {
    // Initialize Vars
    const map_id = req.body.id;
    // Getting user info from encrypted cookie.
    // So no one can exploit this and delete
    // others favourites
    // (unless our key gets cracked)
    const user_id = req.session.user_id;
    const insertString = `
    DELETE FROM user_favourites
    WHERE map_id = $1 AND user_id = $2
    RETURNING *`;

    // Deletes favourite from users favourites
    helper.tryDeleteEntity(res, insertString, [map_id, user_id]);
  });

  // Add map to users favourites
  router.post('/user/favourites', (req, res) => {
    // Initialize Vars
    const map_id = req.body.id;
    // Getting user info from encrypted cookie.
    // So no one can exploit this and delete
    // others favourites
    // (unless our key gets cracked)
    const user_id = req.session.user_id;
    const insertString = `
    INSERT INTO user_favourites(user_id, map_id)
    VALUES ($1, $2)
    RETURNING *;`;

    // Insert favourites to database
    helper.tryReturnJson(res, insertString, [user_id, map_id]);
  });
};


