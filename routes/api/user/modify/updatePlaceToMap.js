module.exports = function(router, db){
  // Import helper and initialize it with the database connection
  const helper = require('../../helpers')(db);

  router.post('/maps/:id/place', (req, res) => {
    const user_id = req.session.user_id;
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

    helper.checkRights(res, checkRightsQuery, [user_id, map_id])
    .then(() => postPlace())
    .catch(err => {
      console.log(err);
      res.status(500).send('Something went wrong on our end')
    });

    function postPlace() {
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
      ]

      helper.tryReturnJson(res, queryString, params)
    }
  });


  router.patch('/maps/:id/place', (req, res) => {

    const map_id = req.params.id;
    const user_id = req.session.user_id;

    const checkRightsQuery = `
    SELECT c.user_id, c.map_id
    FROM collaborators c
    WHERE c.map_id = $2 AND c.user_id = $1
    UNION
    SELECT m.owner_id, m.id
    FROM maps m
    WHERE m.id = $2 AND m.owner_id = $1;
    `;

    helper.checkRights(res, checkRightsQuery, [user_id, map_id])
    .then(() => patchPlace())
    .catch(err => {
      console.log(err);
      res.status(500).send('Something went wrong on our end')
    });

    function patchPlace() {
      const params = [
        req.body.longitude,
        req.body.latitude,
        req.body.title,
        req.body.description,
        req.body.img_url,
        map_id,
        req.body.place
      ]

      const updateString = `
      UPDATE places
      SET longitude = $1,
      latitude = $2,
      title = $3,
      description = $4,
      img_url = $5
      WHERE map_id = $6 AND places.id = $7;`

      helper.tryReturnJson(res, updateString, params)
    }
  })
}
