module.exports = function (app) {
  require('./posts')(app)
  require('./users')(app)
  require('./auth')(app)
  require('./tags')(app)
  require('./urls')(app)
  require('./sources')(app)
}
