
module.exports = function(router, db) {
  const helper = require("../../helpers")(db);
  // POST /maps/create
  router.post('/maps', (req, res) => {

    const user_id = req.session.user_id;

    const checkUserIsRegistered = `
    SELECT id
    FROM users
    WHERE id = $1;
    `;

    helper.checkRights(res, checkUserIsRegistered, [user_id])
    .then(() => createMap())
    .catch(err => {
      console.log(err);
      res.status(500).send('Something went wrong on our end')
    });

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

      db.query(queryString, values)
        .then((result) => {
          res.status(200).json(result.rows[0]);
        })
        .catch((err) => {
          console.log(err);
          res.json({ error: err.message});
        });
    }
  });

};
