var db = require('../models')
// var passport = require('../config/passport')

module.exports = function (app) {
  app.get('/api/users/:username', function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function (dbUser) {
      if (!dbUser) {
        return res.sendStatus(404)
      }
      res.json(dbUser)
    }).catch(function (err) {
      res.send(err)
    })
  })
}
