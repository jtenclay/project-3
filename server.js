var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var passport = require('./api/config/passport')
var cors = require('cors')
require('dotenv').config()

var app = express()
var PORT = process.env.PORT || 8000
var db = require('./api/models')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('dist'))
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}))

require('./api/routes')(app)

// Sync and start listening
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT)
  })
})
