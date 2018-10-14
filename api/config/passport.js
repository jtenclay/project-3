const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
require('dotenv').config()

passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  function (email, password, done) {
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function (dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: 'Incorrect email.'
        })
      } else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        })
      }
      return done(null, dbUser)
    })
  }
))

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  function (jwtPayload, cb) {
    return db.User.findById(jwtPayload)
      .then(user => {
        return cb(null, user)
      })
      .catch(err => {
        return cb(err)
      })
  }
))

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

module.exports = passport
