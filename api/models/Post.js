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

  // Used in our hooks, and includes another database query
  async function formatUrl (post, options) {
    // Eject early if we're looking for a post that doesn't exist
    if (!post) return null

    const kebabTitle = post.title ? dashify(post.title) : ''
    return post.getAuthor().then((author) => {
      post.url = `/@${author.username}/${kebabTitle ? kebabTitle + '-' : ''}${post.id}`
      return post
    })
  }

  Post.hook('afterFind', formatUrl)
  Post.hook('afterUpdate', formatUrl)
  Post.hook('afterCreate', formatUrl)

  // Used when we include Post in an association, and takes the author as a parameter
  Post.prototype.formatUrl = function (user) {
    const kebabTitle = this.title ? dashify(this.title) : ''
    this.url = `/@${user.username}/${kebabTitle ? kebabTitle + '-' : ''}${this.id}`
    return this
  }

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
