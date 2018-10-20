const db = require('../models')

module.exports = function (app) {
  app.get('/api/urls/lookup', function (req, res) {
    db.Url.findOne({
      where: {
        url: req.query.url
      }
    }).then(function (dbUrl) {
      res.json(dbUrl)
    }).catch(function (err) {
      console.log(err)
      res.json(err.errors[0].message)
    })
  })
}
