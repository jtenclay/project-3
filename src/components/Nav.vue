<template lang="pug">
  #nav
    router-link(to="/") Home
    | #{' | '}
    router-link(to="/@hello") Profile
    | #{' | '}
    router-link(to="/@hello/post-1") Post
    | #{' | '}
    router-link(to="/@hello/new") New post
    | #{' | '}
    button(
      v-if="loggedIn"
      @click="logout") Log Out
    router-link(
      v-else
      to="/login") Log In
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Nav',
  computed: mapState({
    loggedIn: state => !!state.users.token
  }),
  methods: {
    logout: function () {
      this.$store.dispatch('users/logout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
