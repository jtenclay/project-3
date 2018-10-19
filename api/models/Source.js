module.exports = function (sequelize, DataTypes) {
  var Source = sequelize.define('Source', {})

  Source.associate = function (models) {
    Source.belongsTo(models.Post, {
      constraints: false
    })
    Source.belongsTo(models.Url, {})
  }

  return Source
}
