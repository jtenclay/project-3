const dashify = require('dashify')

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
    },
    url: {
      type: DataTypes.VIRTUAL
    }
  })

  async function formatUrl (post, options) {
    const kebabTitle = post.title ? dashify(post.title) : ''
    return post.getAuthor().then((author) => {
      post.url = `/@${author.username}/${kebabTitle ? kebabTitle + '-' : ''}${post.id}`
      return post
    })
  }

  Post.hook('afterFind', formatUrl)
  Post.hook('afterUpdate', formatUrl)
  Post.hook('afterCreate', formatUrl)

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
