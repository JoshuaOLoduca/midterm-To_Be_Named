module.exports = function(router, db) {
  // POST /maps/create
  router.post('/create', (req, res) => {
    const queryString = `
    INSERT INTO maps (owner_id, city, title, description)
    VALUES ($1, $2, $3, $4)
    RETURNING id;`;
    const values = [
      req.session.user_id,
      req.body.city,
      req.body.title,
      req.body.description,
    ];
    // console.log(req.body);


    db.query(queryString, values)
      .then((result) => {
        console.log(result);
        res.status(200);
        res.redirect(`/maps/${result.rows[0].id}`);
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: err.message});
      });
  });
};
