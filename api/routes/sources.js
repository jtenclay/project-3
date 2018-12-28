const db = require('../models')
const ogs = require('open-graph-scraper')
const passport = require('../config/passport')
const userCanView = require('../helpers/userCanView')

module.exports = function (app) {
  app.get('/api/sources/check/:url', function (req, res) {
    // TO DO: First find out if they're responding to a post on this site
    // Then see if we have the url already
    db.Url.find({
      where: {
        url: req.params.url
      }
    }).then(dbUrl => {
      // If we have the url in the database, send it
      if (dbUrl) res.json(dbUrl)
      else {
        // Otherwise grab its info from the open graph scraper
        ogs({ url: req.params.url }, function (ogsErr, results) {
          if (ogsErr) res.sendStatus(404)
          else res.json(results.data)
        })
      }
    }).catch(dbErr => {
      console.log('err', dbErr)
      res.status(422).json(dbErr)
    })
  })

  app.get('/api/sources/:id', function (req, res, next) {
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
      if (err) {
        console.log(err)
        res.json(err.errors[0].message)
      }
      db.Source.findOne({
        where: {
          id: req.params.id
        },
        include: [{
          association: 'posts',
          include: [{
            association: 'author',
            attributes: ['id', 'firstName', 'lastName', 'username']
          }]
        }]
      }).then(function (dbSource) {
        const filteredPosts = dbSource.posts.filter(post => userCanView(user, post))
          .map(post => post.formatUrl(post.author))
        if (!dbSource) {
          return res.sendStatus(404)
        }
        dbSource.posts = filteredPosts
        res.json({
          ...dbSource.dataValues,
          posts: filteredPosts
        })
      }).catch(function (err) {
        console.log(err)
        res.status(422).json(err.errors ? err.errors[0].message : err)
      })
    })(req, res, next)
  })
}
