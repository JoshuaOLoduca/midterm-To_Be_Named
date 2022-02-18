module.exports = function(router, db) {
  const helper = require('../../helpers')(db);

  //  update maps
  router.patch('/maps/:id', (req, res) => {
    if (!req.body) res.status(400).send('No info in body');

    const user_id = req.session.user_id;
    const map_id = req.params.id;

    let updateQuery = `UPDATE maps SET `;
    const parameters = [];

    helper.checkIfOwner(res, user_id, map_id)
      .then(() => updateMap())
      .catch(err => {
        console.log(err);
        res.status(500).send('Something went wrong on our end');
      });

    function updateMap() {
      for (const key in req.body) {
        parameters.push(req.body[key]);
        updateQuery += `
        ${key} = $${parameters.length},`;
      }
      updateQuery = updateQuery.slice(0, -1);
      parameters.push(req.params.id);
      updateQuery += ` WHERE maps.id = $${parameters.length}`;

      helper.tryReturnJson(res, updateQuery, parameters);
    }
  });
};
