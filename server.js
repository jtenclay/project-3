var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var PORT = process.env.PORT || 8000
var db = require('./api/models')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('dist'))

require('./api/routes')(app)

// Sync and start listening
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT)
  })
})
