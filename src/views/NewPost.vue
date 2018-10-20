<template lang="pug">
  div
    div Here's the new post page.
</template>

<script>
import postsApi from '@/api/posts'

export default {
  name: 'NewPost',
  created () {
    postsApi.newPost().then(this.newPostOnSuccess).catch(this.newPostOnFail)
  },
  methods: {
    newPostOnSuccess (post) {
      console.log('successful', post)
      this.$router.replace(`/@${this.$route.params.user_handle}/${post.id}/edit`)
    },
    newPostOnFail (err) {
      if (err.response.status === 401) {
        this.$router.replace('/login')
      }
      console.log(err)
    }
  }
}
</script>
