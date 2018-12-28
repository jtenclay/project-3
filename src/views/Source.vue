<template lang="pug">
  div
    div(v-if="loading") Loading...
    div(v-else-if="sourceDoesNotExist") It looks like this post doesn't exist. 😅
    //- else we have our source
    div(v-else)
      div(v-for="post in source.posts")
        router-link(:to="post.url") {{post.id}} {{post.title}}
</template>

<script>
import sourcesApi from '@/api/sources'

export default {
  name: 'Source',
  data () {
    return {
      loading: true,
      sourceDoesNotExist: false,
      source: null
    }
  },
  created () {
    sourcesApi.getSource(this.$route.params.source_id)
      .then(this.getSourceOnSuccess)
      .catch(this.getSourceOnFail)
  },
  methods: {
    getSourceOnSuccess ({ data }) {
      console.log(data)
      this.source = data
      this.loading = false
    },
    getSourceOnFail (err) {
      if (err.response && err.response.status === 404) {
        this.loading = false
        this.sourceDoesNotExist = true
      } else {
        console.log(err)
      }
    }
  }
}
</script>
