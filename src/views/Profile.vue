<template lang="pug">
  div
    div Hey there, you're on the route for user {{ $route.params.user_handle }}
    div(v-if="userDoesNotExist") It looks like this user doesn't exist. 😅
    div(v-else-if="!user") Loading...
    //- else we have our user
    div(v-else)
      h1 {{ user.firstName }}
      p {{ user.id }}
</template>

<script>
import { mapState } from 'vuex'
import usersApi from '@/api/users'

export default {
  name: 'Profile',
  data () {
    return {
      userDoesNotExist: false,
      user: null,
      posts: [],
      getPostsErr: null
    }
  },
  computed: mapState({
    currentUser (state) {
      return state.currentUser
    }
  }),
  created () {
    usersApi.getProfile(this.$route.params.user_handle)
      .then(this.getProfileOnSuccess)
      .catch(this.getProfileOnFail)
  },
  methods: {
    getProfileOnSuccess ({ data }) {
      const { Posts, ...rest } = data
      this.posts = Posts
      this.user = rest
    },
    getProfileOnFail (err) {
      if (err.response.status === 404) {
        this.userDoesNotExist = true
      }
    }
  }
}
</script>
