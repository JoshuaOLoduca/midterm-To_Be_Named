module.exports = function(db) {

  // Helper to return result.rows to clients(res)
  // And Handle the request appropriately
  function tryReturnJson(res, queryString, params) {
    // executes query against database
    db.query(queryString, params)
      // On Success
      .then(response => {
        // If rows exists, consider it a success
        const result = response.rows;
        if (result) return res.status(200).json(result);

        // Let user know server errored out
        res.status(500).send("Something went wrong on our end");
      })
      // Catch Server errors
      .catch(err => {
        console.log(err);
        // Let user know server errored out
        res.status(500).send("Something went wrong on our end");
      });
  }

  // Try to delete from Database
  // And Handle the request appropriately
  // QUERY MUST CONTAIN 'RETURNING *;'
  function tryDeleteEntity(res, deleteString, params) {
    db.query(deleteString, params)
      // On Success
      .then(response => {
        const result = response.rows[0];
        // If first result exists, consider it deleted
        // And let user know
        if (result) return res.status(200).send('Deleted');
        // Otherwise, let user know there is nothing to delete
        res.status(404).send("Nothing there kiddo");
      })
      // Catch Server errors
      .catch(err => {
        console.log(err);
        // Let user know server errored out
        res.status(500).send("Something went wrong on our end");
      });
  }

  // Check to see if user has rights
  // And Handle the request appropriately
  function checkRights(res, checkRightsQuery, params) {
    return db.query(checkRightsQuery, params)
      // On Success
      .then(response => {
        const result = response.rows;
        // There is nothing in result, then user doesnt have access
        if (!result.length) throw new Error('You dont have rights');
        // Otherwise, return result
        // Just returning so we are returning a promise
        return result;
      })
      // Catch Server errors
      .catch(err => {
        console.log(err);
        // Let user know they dont have access
        res.status(403).send(err.message);
      });
  }

  // Checks to see if user owns map
  // And Handle the request appropriately
  function checkIfOwner(res, user_id, map_id) {
    // Initialize Vars
    const params = [user_id, map_id];
    const checkRightsQuery = `
    SELECT m.owner_id
    FROM maps m
    WHERE m.owner_id = $1 AND m.id = $2;
    `;

    // Return Promise
    // Querys database to see if user owns map
    return db.query(checkRightsQuery, params)
      // On Success
      .then(response => {
        const result = response.rows;
        // If nothing returned, they dont own the map
        if (!result.length) throw new Error('You dont have rights');
        // Otherwise, return Promise with data
        return result;
      })
      // Catch server Errors
      .catch(err => {
        console.log(err);
        // Let user know they dont have access
        res.status(403).send(err.message);
      });
  }

  return { tryReturnJson, tryDeleteEntity, checkRights,checkIfOwner };
};
