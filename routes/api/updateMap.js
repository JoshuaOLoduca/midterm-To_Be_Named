module.exports = function(router, db) {
  const helper = require('./helpers')(db);

  //  update maps
  router.patch('/maps/:id', (req, res) => {
    let updateQuery = `UPDATE maps SET `;
    const parameters = [];

    for (const key in req.body) {
      parameters.push(req.body[key]);
      updateQuery += `
      ${key} = $${parameters.length},`;
    }
    updateQuery = updateQuery.slice(0, -1);
    parameters.push(req.params.id);
    updateQuery += ` WHERE maps.id = $${parameters.length}`;

    console.log(updateQuery);

    helper.tryReturnJson(res, updateQuery, parameters);
  });
};
