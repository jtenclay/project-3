const db = require('../models')
const passport = require('../config/passport')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function (app) {
  app.get('/api/me', passport.authenticate('jwt', { session: false }), function (req, res) {
    db.User.findById(req.user.id)
      .then(function (dbUser) {
        return res.json({
          user: {
            id: dbUser.id,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            username: dbUser.username
          },
          token: jwt.sign(dbUser.id, process.env.JWT_SECRET)
        })
      }).catch(function (err) {
        console.log(err)
        res.status(422).json(err.errors[0].message)
      })
  })

  app.post('/api/login', function (req, res) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (!user) {
        return res.sendStatus(401)
      }
      if (err) {
        return res.status(422).json(err.errors[0].message)
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err)
        }
        const token = jwt.sign(user.id, process.env.JWT_SECRET)
        return res.json({
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username
          },
          token
        })
      })
    })(req, res)
  })

  app.post('/api/signup', function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username
    }).then(function () {
      res.redirect(307, '/api/login')
    }).catch(function (err) {
      console.log(err)
      res.status(422).json(err.errors[0].message)
    })
  })

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })
}
