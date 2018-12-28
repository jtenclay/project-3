var db = require('../models')
var ogs = require('open-graph-scraper')

module.exports = function (app) {
  app.get('/api/sources/:url', function (req, res) {
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
}
