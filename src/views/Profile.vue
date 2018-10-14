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

export default {
  name: 'Profile',
  data () {
    return {
      loading: true,
      userDoesNotExist: false
    }
  },
  computed: mapState({
    user (state) {
      return state.users.all.find(user => user.username === this.$route.params.user_handle)
    }
  }),
  created () {
    this.$store.dispatch('users/getUser', this.$route.params.user_handle).catch(this.getUserOnFail)
  },
  methods: {
    getUserOnFail (err) {
      if (err.response.status === 404) {
        this.userDoesNotExist = true
      }
    }
  }
}
</script>
