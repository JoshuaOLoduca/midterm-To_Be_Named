module.exports = function(router, db) {
  const helper = require('../helpers')(db);

  router.post('/maps/:id', (req, res) => {

    const map_id = req.params.id;
    const {user_id} = req.session;

    const insertString = `
    INSERT INTO user_favourites
    VALUES ($1, $2)
    RETURNING *;`;

    console.log(req.body);
    helper.tryReturnJson(res, insertString, [user_id, map_id]);


  });
};


