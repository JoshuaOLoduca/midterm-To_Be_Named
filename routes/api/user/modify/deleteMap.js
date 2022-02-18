module.exports = function(router, db) {
  const helper = require('../../helpers')(db);

  //  render index page
  router.delete('/maps/:id', (req, res) => {
    const user_id = req.session.user_id;
    const map_id = req.params.id;

    helper.checkIfOwner(res, user_id, map_id)
      .then(() => deleteMap())
      .catch(err => {
        console.log(err);
        res.status(500).send('Something went wrong on our end');
      });

    function deleteMap() {
      const deleteString = `
      DELETE
      FROM maps
      WHERE id = $1
        AND owner_id = $2
      RETURNING *;
      `;

      helper.tryDeleteEntity(res, deleteString, [map_id, user_id]);
    }
  });
};
