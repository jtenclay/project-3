<template lang="pug">
  div
    div Here's the new post page.
</template>

<script>
import postsApi from '@/api/posts'
import { mapState } from 'vuex'

export default {
  name: 'NewPost',
  computed: mapState({
    username: function (state) {
      return state.currentUser.username
    }
  }),
  created () {
    postsApi.newPost().then(this.newPostOnSuccess).catch(this.newPostOnFail)
  },
  methods: {
    newPostOnSuccess ({ data }) {
      this.$router.replace(`/@${this.username}/${data.id}/edit`)
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
