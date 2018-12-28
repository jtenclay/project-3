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
          association: 'postSource',
          include: [{
            model: db.Url,
            attributes: ['url', 'title']
          }]
        }, {
          association: 'parts'
        }]
      }).then(function (dbPost) {
        if (!dbPost) {
          return res.sendStatus(404)
        }
        if (!userCanView(user, dbPost)) return res.sendStatus(404)
        res.json(dbPost)
      }).catch(function (err) {
        console.log(err)
        res.status(422).json(err.errors ? err.errors[0].message : err)
      })
    })(req, res, next)
  })

  app.post('/api/posts', passport.authenticate('jwt', { session: false }), function (req, res) {
    db.Post.create({
      authorId: req.user.id,
      ...req.body
    }, {
      include: [{
        association: 'postSource',
        include: [db.Url]
      }]
    }).then(function (dbPost) {
      res.json(dbPost)
    }).catch(function (err) {
      console.log(err)
      res.status(422).json(err.errors ? err.errors[0].message : err)
    })
  })

  // DELETE route for deleting posts
  app.delete('/api/posts/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
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
    // db.Url.find({
    //   where: {
    //     url: req.body.source
    //   }
    // }).then(dbUrl => {
    //   // Our url exists already

    // }).catch(() => {

    // })

    db.sequelize.transaction(function (t) {
      let urlPromise
      // First manage our post's source
      if (req.body.source) {
        urlPromise = db.Url.findOrCreate({
          where: {
            url: req.body.source
          },
          transaction: t
        })
      } else {
        urlPromise = Promise.resolve([])
      }
      return urlPromise.then(function ([dbUrl, wasCreated]) {
        let sourcePromise
        if (dbUrl) {
          sourcePromise = db.Source.findOrCreate({
            where: {
              UrlId: dbUrl.id
            },
            transaction: t
          })
        } else {
          sourcePromise = Promise.resolve([])
        }
        return sourcePromise.then(function ([dbSource, wasCreated]) {
          // Include our post source if we have it
          console.log(dbSource)
          const values = req.body
          if (dbSource) {
            values.postSourceId = dbSource.id
          }
          // Update our post
          return db.Post.update(values, {
            where: {
              id: req.params.id
            },
            transaction: t
            // include: [{
            //   model: db.Url,
            //   through: {
            //     include: [db.Source]
            //   }
            // }]
          }).then(function (dbPost) {
            // Destroy the old post parts
            return db.PostPart.destroy({
              where: {
                PostId: req.body.id
              },
              transaction: t
            }).then(function () {
              // Create our new post parts
              return db.PostPart.bulkCreate(req.body.parts.map(part => ({
                PostId: req.body.id,
                ...part
              })), {
                transaction: t
              })
            })
          })
        })
      })
    }).then(function (dbPost) {
      res.json(dbPost)
    }).catch(function (err) {
      console.log(err)
      res.status(422).json(err.errors ? err.errors[0].message : err)
    })
  })
}
