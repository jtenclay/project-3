// var db = require('../models')
var ogs = require('open-graph-scraper')

module.exports = function (app) {
  app.get('/api/sources/:url', function (req, res) {
    // console.log(req.params.url)
    ogs({ url: req.params.url }, function (error, results) {
      console.log('error:', error) // This is returns true or false. True if there was a error. The error it self is inside the results object.
      console.log('results:', results)
    })
    res.json(200)
  })
}
