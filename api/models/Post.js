module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    publishedAt: {
      type: DataTypes.DATE
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  })

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      as: 'author',
      foreignKey: {
        allowNull: false
      }
    })
    Post.hasMany(models.Tag, {})
    Post.hasMany(models.PostPart, {
      as: 'parts'
    })
  }

  // Post.belongsTo('Source', { as: 'postSource' })

  return Post
}
