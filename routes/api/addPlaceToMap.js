module.exports = function(router, db){
  const helper = require('./helpers')(db);

  router.post('/maps/:id/place', (req, res) => {
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
  });
}
