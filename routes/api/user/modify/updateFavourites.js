module.exports = function(router, db) {
  const helper = require('../../helpers')(db);

  router.delete('/user/favourites', (req, res) => {
    const map_id = req.body.id;
    const user_id = req.session.user_id;


    const insertString = `
    DELETE FROM user_favourites
    WHERE map_id = $1 AND user_id = $2
    RETURNING *`;

    helper.tryDeleteEntity(res, insertString, [map_id, user_id]);
  });

  router.post('/user/favourites', (req, res) => {
    const map_id = req.body.id;
    const user_id = req.session.user_id;

    const insertString =`
    INSERT INTO user_favourites(user_id, map_id)
    VALUES ($1, $2)
    RETURNING *;`;

    helper.tryReturnJson(res, insertString, [user_id, map_id]);
  })
};


