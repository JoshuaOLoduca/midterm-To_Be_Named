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
        if (result) return res.status(200).send('Deleted');
        res.status(404).send("Nothing there kiddo");
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong on our end");
      });
  }

  function checkRights(res, checkRightsQuery, params) {
    return db.query(checkRightsQuery, params)
    .then(response => {
      const result = response.rows;
      console.log(params, checkRightsQuery)
      if (!result.length) return res.status(403).send('You dont have rights')
      return result;
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Something went wrong on our end");
    })
  }

  function checkIfOwner(res, user_id, map_id) {
    const params = [user_id, map_id];
    const checkRightsQuery = `
    SELECT m.owner_id
    FROM maps m
    WHERE m.owner_id = $1 AND m.id = $2;
    `;

    return db.query(checkRightsQuery, params)
    .then(response => {
      const result = response.rows;
      if (!result.length) throw new Error('You dont have rights')
      return result;
    })
    .catch(err => {
      console.log(err);
      res.status(403).send(err.message);
    })
  }

  return { tryReturnJson, tryDeleteEntity, checkRights,checkIfOwner };
}
