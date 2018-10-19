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
      defaultValue: false
    }
  })

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      as: 'author',
      foreignKey: {
        allowNull: false
      }
    })
    Post.belongsTo(models.Source, {
      as: 'postSource'
    })
    Post.hasMany(models.Tag, {})
    Post.hasMany(models.PostPart, {
      as: 'parts'
    })
  }

  return Post
}
