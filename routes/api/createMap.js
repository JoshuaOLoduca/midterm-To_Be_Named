module.exports = function(router, db) {
  // POST /maps/create
  router.post('/maps', (req, res) => {
    const queryString = `
    INSERT INTO maps (owner_id, city, title, description, cover_img)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;
    const values = [
      req.session.user_id,
      req.body.city,
      req.body.title,
      req.body.description,
      req.body.cover_img,
    ];
    // console.log(req.body);


    db.query(queryString, values)
      .then((result) => {
        console.log(result);
        res.status(200).json(result.rows[0]);
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: err.message});
      });
  });
};
