module.exports = function userCanView (user, post) {
  if (!post.publishedAt || post.isPrivate) {
    // this post is protected
    if (!user) {
      return false
    }
    if (user.id !== post.authorId) {
      return false
    }
  }
  return true
}
