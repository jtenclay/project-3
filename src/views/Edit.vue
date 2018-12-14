<template lang="pug">
  div
    div Here's the new post page.
    Editor(
      v-if="post"
      :post="post")
</template>

<script>
import postsApi from '@/api/posts'
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
      postDoesNotExist: false,
      post: null
    }
  },
  computed: {
    postId: function () {
      if (!this.$route.params.post_slug) {
        return null
      }
      // Grab final segment of the url
      const arr = this.$route.params.post_slug.split('-')
      return arr[arr.length - 1]
    }
  },
  created () {
    if (!this.$route.params.post_slug) {
      postsApi.newPost().then(this.newPostOnSuccess).catch(this.newPostOnFail)
    } else {
      postsApi.getPost(this.postId).then(this.getPostOnSuccess).catch(this.getPostOnFail)
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
    getPostOnSuccess ({ data }) {
      console.log('hello')
      console.log(data)
      this.post = data
    },
    getPostOnFail (err) {
      if (err.response.status === 404) {
        this.postDoesNotExist = true
      }
    }
  }
}
</script>
