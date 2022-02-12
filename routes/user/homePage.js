module.exports = function (router, db) {
  //  render index page
  router.get('/', (req, res) => {
    res.render('index');
  });
}
