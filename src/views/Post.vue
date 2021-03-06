<template lang="pug">
  div
    div(v-if="loading") Loading...
    div(v-else-if="postDoesNotExist") It looks like this post doesn't exist. 😅
    //- else we have our post
    div(v-else)
      div(v-if="post.postSource && post.postSource.Url")
        | From:&nbsp;
        a(
          :href="post.postSource.Url.url"
          target="_blank"
          rel="noopener noreferrer")
          | {{ post.postSource.Url.title || post.postSource.Url.url }}
        br
        router-link(
          :to="sourceDetailUrl") See other posts with this source
      h1 {{ post.title }}
      p {{ post.description }}
      div(v-if="post.publishedAt") Published at {{ formattedDate }}
        span(v-if="post.isPrivate")  (Private)
      div(v-else) This post is a draft
      div(v-if="canEdit")
        router-link(:to="editUrl") Edit this post
        button(
          v-if="!post.publishedAt"
          @click="publish") Publish this post!
      div(
        v-for="part in post.parts"
        :key="part.id") part with type {{ part.type }}
        h2(
          v-if="part.type !== 'image'") {{ part.text }}
        img(
          v-if="part.type === 'image'"
          :src="part.imageUrl")
</template>

<script>
import { mapState } from 'vuex'
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
    editUrl: function () {
      return `/@${this.$route.params.user_handle}/${this.postId}/edit`
    },
    sourceDetailUrl: function () {
      return `/source/${this.post.postSourceId}`
    },
    postId: function () {
      // Grab final segment of the url
      const arr = this.$route.params.post_slug.split('-')
      return arr[arr.length - 1]
    },
    formattedDate: function () {
      return new Date(this.post.publishedAt).toLocaleString()
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
    this.getPost(this.postId)
    // this.$store.dispatch('posts/getPost', this.postId).then(this.getPostOnSuccess).catch(this.getPostOnFail)
  },
  beforeRouteUpdate (to, from, next) {
    // Refresh our post
    const arr = to.params.post_slug.split('-')
    this.getPost(arr[arr.length - 1])
    next()
  },
  methods: {
    getPost (id) {
      postsApi.getPost(id)
        .then(this.getPostOnSuccess)
        .catch(this.getPostOnFail)
    },
    getPostOnSuccess ({ data }) {
      // Create human-readable url
      console.log(data)
      this.post = data
      this.$router.replace(data.url)
      this.loading = false
    },
    getPostOnFail (err) {
      if (err.response && err.response.status === 404) {
        this.loading = false
        this.postDoesNotExist = true
      } else {
        console.log(err)
      }
    },
    publish () {
      postsApi.updatePost(this.postId, { publishedAt: Date.now() })
    }
  }
}
</script>
