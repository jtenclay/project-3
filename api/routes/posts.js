var db = require('../models')
var passport = require('../config/passport')
const userCanView = require('../helpers/userCanView')

module.exports = function (app) {
  app.get('/api/posts/', function (req, res) {
    console.log(req)
    db.Post.findAll({})
      .then(function (dbPost) {
        res.json(dbPost)
      })
  })

  app.get('/api/posts/:id', function (req, res, next) {
    // TO DO: MOVE PASSPORT INSIDE SO IT CAN FUNCTION BOTH WAYS
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
      if (err) {
        console.log(err)
        res.json(err.errors[0].message)
      }
      db.Post.findOne({
        where: {
          id: req.params.id
        },
        include: [{
          association: 'author',
          attributes: ['id', 'firstName', 'lastName', 'username']
        }, {
          association: 'postSource'
        }]
      }).then(function (dbPost) {
        if (!dbPost) {
          return res.sendStatus(404)
        }
        if (!userCanView(user, dbPost)) return res.sendStatus(404)
        res.json(dbPost)
      }).catch(function (err) {
        console.log(err)
        res.json(err.errors[0].message)
      })
    })(req, res, next)
  })

  app.post('/api/posts', passport.authenticate('jwt', { session: false }), function (req, res) {
    let promise

    if (req.body.postSource) {
      promise = db.Source.create(req.body.postSource)
    } else {
      promise = Promise.resolve()
    }

    promise.then(function (dbSource) {
      db.Post.create({
        authorId: req.user.id,
        postSourceId: dbSource ? dbSource.id : null,
        ...req.body
      }).then(function (dbPost) {
        res.json(dbPost)
      }).catch(function (err) {
        res.status(422).json(err.errors ? err.errors[0].message : err)
      })
    })
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
  app.put('/api/posts/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      res.json(dbPost)
    })
  })
}
