<template lang="pug">
  div
    div Hey there, you're on the route for user {{ $route.params.user_id }}
      | and the post {{ $route.params.post_id }}
    div(v-if="loading") I'm loading
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Post',
  data () {
    return {
      loading: true
    }
  },
  created () {
    this.$store.dispatch('posts/getAllPosts')
  }
}
</script>
