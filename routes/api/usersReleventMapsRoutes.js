module.exports = function (router, db) {
  const helper = require('./helpers')(db);

  router.get('/users/:user_id/maps/favourites', (req, res) => {

    const {user_id} = req.params;

    const queryString = `
    SELECT m.*
    FROM maps m
    JOIN user_likes ul ON m.id = ul.map_id
    WHERE ul.user_id = $1;
    `;

    helper.tryReturnJson(res, queryString, [ user_id ]);
  });


  router.get('/users/:user_id/maps', (req, res) => {

    const {user_id} = req.params;

    const queryString = `
    SELECT *
    FROM maps m
    WHERE m.owner_id = $1;
    `;

    helper.tryReturnJson(res, queryString, [ user_id ]);
  });


  router.get('/users/:user_id/maps/collaborate', (req, res) => {

    const {user_id} = req.params;

    const queryString = `
    SELECT m.*
    FROM maps m
    JOIN collaborators c ON c.map_id = m.id
    WHERE c.user_id = $1;
    `;

    helper.tryReturnJson(res, queryString, [ user_id ]);
  });

}
