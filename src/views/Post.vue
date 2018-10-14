<template lang="pug">
  div
    div Hey there, you're on the route for user {{ $route.params.user_id }}
      | and the post {{ postId }}
    div(v-if="postDoesNotExist") It looks like this post doesn't exist. 😅
    div(v-else-if="!post") Loading...
    //- else we have our post
    div(v-else)
      h1 {{ post.title }}
      p {{ post.description }}
      div(v-if="post.published_at") Published at {{ post.published_at }}
        span(v-if="post.is_private")  (Private)
      div(v-else) This post is a draft
</template>

<script>
import { mapState } from 'vuex'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Post',
  data () {
    return {
      loading: true,
      postDoesNotExist: false
    }
  },
  computed: {
    postId: function () {
      // Grab final segment of the pot
      const arr = this.$route.params.post_slug.split('-')
      return arr[arr.length - 1]
    },
    ...mapState({
      post (state) {
        return state.posts.all.find(post => post.id === parseInt(this.postId))
      }
    })
  },
  created () {
    this.$store.dispatch('posts/getPost', this.postId).catch(this.getPostOnFail)
  },
  methods: {
    getPostOnFail (err) {
      if (err.response.status === 404) {
        this.postDoesNotExist = true
      }
    }
  }
}
</script>
