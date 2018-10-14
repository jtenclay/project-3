var db = require('../models')
var passport = require('../config/passport')

module.exports = function (app) {
  app.get('/api/posts/', function (req, res) {
    db.Post.findAll({})
      .then(function (dbPost) {
        res.json(dbPost)
      })
  })

  app.get('/api/posts/:id', function (req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      res.json(dbPost)
    })
  })

  app.post('/api/posts', passport.authenticate('jwt', { session: false }), function (req, res) {
    db.Post.create({
      ...req.body,
      authorId: req.user.id
    }).then(function (dbPost) {
      res.json(dbPost)
    }).catch(function (err) {
      res.status(422).json(err.errors[0].message)
    })
    // res.redirect('/users/' + req.user.username);
  })

  // DELETE route for deleting posts
  app.delete('/api/posts/:id', function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      res.json(dbPost)
    })
  })

  // PUT route for updating posts
  app.put('/api/posts', function (req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (dbPost) {
      res.json(dbPost)
    })
  })
}
