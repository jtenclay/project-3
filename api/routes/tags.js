const db = require('../models')

module.exports = function (app) {
  app.get('/api/tags', function (req, res) {
    db.Tag.findAll({})
      .then(function (tags) {
        res.json(tags)
      })
  })
}
