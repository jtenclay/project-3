module.exports = function (sequelize, DataTypes) {
  var Url = sequelize.define('Url', {
    url: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    }
  })

  return Url
}
