module.exports = function (db) {

  function tryReturnJson(res, queryString, params) {
    db.query(queryString, params)
    .then(response => {
      const result = response.rows;
      if (result) return res.status(200).json(result);

      res.status(500).send("Something went wrong on our end");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Something went wrong on our end");
    });
  }

  function tryDeleteEntity(res, deleteString, params) {
    db.query(deleteString, params)
      .then(response => {
        const result = response.rows[0];
        console.log(result);
        if (result) return res.status(200).send('Deleted');
        res.status(404).send("Nothing there kiddo");
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong on our end");
      });
  }

  return { tryReturnJson, tryDeleteEntity };
}
