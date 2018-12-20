var db = require('../models')
var passport = require('../config/passport')
const userCanView = require('../helpers/userCanView')

module.exports = function (app) {
  app.get('/api/users/:username', function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
      if (err) {
        console.log(err)
        res.json(err.errors[0].message)
      }
      db.User.findOne({
        where: {
          username: req.params.username
        },
        // attributes: ['id', 'firstName', 'lastName', 'username'],
        include: req.query.includePosts
          ? [{
            model: db.Post
          }] : []
      }).then(function (dbUser) {
        if (!dbUser) {
          return res.sendStatus(404)
        }
        const filteredPosts = dbUser.Posts.filter(post => userCanView(user, post))
          .map(post => post.formatUrl(dbUser))

        res.json({
          Posts: filteredPosts,
          id: dbUser.id,
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
          username: dbUser.username
        })
      }).catch(function (err) {
        console.log(err)
        res.send(err)
      })
    })(req, res, next)
  })
}
