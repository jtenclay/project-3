module.exports = function (sequelize, DataTypes) {
  var PostPart = sequelize.define('PostPart', {
    index: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.ENUM('heading', 'image'),
      defaultValue: 'heading'
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    }
  })

  return PostPart
}
