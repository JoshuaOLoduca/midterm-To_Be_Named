module.exports = function(router, db) {
  const helper = require('../../helpers')(db);

  // Updates Map
  router.patch('/maps/:id', (req, res) => {
    // Checks to see if body is empty
    if (!req.body) return res.status(400).send('No info in body');

    // Initializing Vars
    const user_id = req.session.user_id;
    const map_id = req.params.id;
    let updateQuery = `UPDATE maps SET `;

    // Checks to see if user owns map
    helper.checkIfOwner(res, user_id, map_id)
      // If they do, update it
      .then(() => updateMap())
      // Catch server errors
      .catch(err => {
        console.log(err);
        // Let user know we oopsied
        res.status(500).send('Something went wrong on our end');
      });

    // Updates map
    function updateMap() {
      const parameters = [];
      // Initializing query string
        // Loob though each key in body
      for (const key in req.body) {
        // Push value to array
        parameters.push(req.body[key]);
        // Insert key for column name
        // And put $<number> to its value
        // because we are checking for cross server scripting VIA sql
        updateQuery += `
        ${key} = $${parameters.length},`;
      }
      // Remove last comma (,)
      updateQuery = updateQuery.slice(0, -1);
      // Push map ID to paramaters
      parameters.push(req.params.id);
      // Add map ID to query string
      updateQuery += ` WHERE maps.id = $${parameters.length}`;

      // Try to update map (doesnt return anyting to user)
      helper.tryReturnJson(res, updateQuery, parameters);
    }
  });
};
