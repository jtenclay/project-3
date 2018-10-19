<template lang="pug">
  div
    div Here's the new post page.
    Editor(:postId="postId")
</template>

<script>
import { mapState } from 'vuex'
import Editor from '@/components/posts/Editor.vue'

export default {
  name: 'Edit',
  components: {
    Editor
  },
  data () {
    return {
      title: '',
      description: '',
      isPrivate: false,
      postDoesNotExist: false
    }
  },
  computed: mapState({
    postId: function () {
      if (!this.$route.params.post_slug) {
        return null
      }
      // Grab final segment of the url
      const arr = this.$route.params.post_slug.split('-')
      return arr[arr.length - 1]
    },
    ...mapState({
      post (state) {
        return state.posts.all.find(post => post.id === parseInt(this.postId))
      }
    })
  }),
  created () {
    if (!this.$route.params.post_slug) {
      this.$store.dispatch('posts/newPost').then(this.newPostOnSuccess).catch(this.newPostOnFail)
    } else {
      this.$store.dispatch('posts/getPost', this.postId).catch(this.getPostOnFail)
    }
  },
  methods: {
    newPostOnSuccess (post) {
      console.log('successful', post)
      this.$router.replace(`/@${this.$route.params.user_handle}/edit/${post.id}`)
    },
    newPostOnFail (err) {
      console.log(err)
    },
    getPostOnFail (err) {
      if (err.response.status === 404) {
        this.postDoesNotExist = true
      }
    }
  }
}
</script>
