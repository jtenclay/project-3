var db = require('../models')
var passport = require('../config/passport')

module.exports = function (app) {
  app.get('/api/tags', function (req, res) {
    db.Tag.findAll({})
      .then(function (tags) {
        res.json(tags)
      })
  })

  app.post('/api/login', passport.authenticate('local'), function (req, res) {
    res.send('Success')
  })

  app.post('/api/signup', function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, '/api/login')
    }).catch(function (err) {
      console.log(err)
      res.json(err)
      // res.status(422).json(err.errors[0].message);
    })
  })

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  // GET route for getting all of the posts
  // app.get('/api/posts/', function(req, res) {
  //   db.Post.findAll({})
  //     .then(function(dbPost) {
  //       res.json(dbPost)
  //     })
  // })

  // // Get route for returning posts of a specific category
  // app.get('/api/posts/category/:category', function(req, res) {
  //   db.Post.findAll({
  //     where: {
  //       category: req.params.category
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost)
  //     })
  // })

  // // Get route for retrieving a single post
  // app.get('/api/posts/:id', function(req, res) {
  //   db.Post.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost)
  //     })
  // })

  // // POST route for saving a new post
  // app.post('/api/posts', function(req, res) {
  //   console.log(req.body)
  //   db.Post.create({
  //     title: req.body.title,
  //     body: req.body.body,
  //     category: req.body.category
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost)
  //     })
  // })

  // // DELETE route for deleting posts
  // app.delete('/api/posts/:id', function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost)
  //     })
  // })

  // // PUT route for updating posts
  // app.put('/api/posts', function(req, res) {
  //   db.Post.update(req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     })
  //     .then(function(dbPost) {
  //       res.json(dbPost)
  //     })
  // })
}
