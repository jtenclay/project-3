<template lang="pug">
  div
    div Hey there, you're on the route for user {{ $route.params.user_handle }}
      | and the post {{ postId }}
    div(v-if="loading") Loading...
    div(v-else-if="postDoesNotExist") It looks like this post doesn't exist. 😅
    //- else we have our post
    div(v-else)
      h1 {{ post.title }}
      p {{ post.description }}
      div(v-if="post.publishedAt") Published at {{ post.published_at }}
        span(v-if="post.isPrivate")  (Private)
      div(v-else) This post is a draft
      div(v-if="canEdit")
        button(@click="publish") Publish this post!
</template>

<script>
import { mapState } from 'vuex'
import dashify from 'dashify'
import postsApi from '@/api/posts'

export default {
  name: 'Post',
  data () {
    return {
      loading: true,
      postDoesNotExist: false,
      post: null
    }
  },
  computed: {
    postId: function () {
      // Grab final segment of the url
      const arr = this.$route.params.post_slug.split('-')
      return arr[arr.length - 1]
    },
    ...mapState({
      // post (state) {
      //   return state.posts.all.find(post => post.id === parseInt(this.postId))
      // },
      // author (state) {
      //   return state.users.all.find(user => user.id === this.post.authorId)
      // },
      // currentUserId (state) {
      //   return state.users.token ? JSON.parse(atob(state.users.token.split('.')[1])) : null
      // },
      canEdit (state) {
        return this.post
          ? state.currentUser.id === this.post.authorId
          : false
      }
    })
  },
  created () {
    postsApi.getPost(this.postId)
      .then(this.getPostOnSuccess)
      .catch(this.getPostOnFail)
    // this.$store.dispatch('posts/getPost', this.postId).then(this.getPostOnSuccess).catch(this.getPostOnFail)
  },
  methods: {
    getPostOnSuccess ({ data }) {
      // Create human-readable url
      this.post = data
      const kebabTitle = dashify(data.title)
      this.$router.replace(`/@${this.$route.params.user_handle}/${kebabTitle ? kebabTitle + '-' : ''}${this.postId}`)
      this.loading = false
    },
    getPostOnFail (err) {
      if (err.response.status === 404) {
        this.loading = false
        this.postDoesNotExist = true
      }
    },
    publish () {
      postsApi.updatePost(this.postId, { publishedAt: Date.now() })
    }
  }
}
</script>
