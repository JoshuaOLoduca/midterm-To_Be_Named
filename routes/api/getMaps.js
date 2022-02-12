module.exports = function (router, db) {
  //  render index page
  router.get('/maps', (req, res) => {
    const queryString = `
    SELECT *
    FROM maps
    WHERE public = true;
    `;

    db.query(queryString)
      .then(response => {
        const result = response.rows;
        console.log(result);
        if (result) return res.status(200).json(result);
        res.status(500).send("Something went wron on our end");
      })
      .catch(err => console.log(err));
  });
}
