<template lang="pug">
  #nav
    router-link(to="/") Home
    | #{' | '}
    router-link(:to="'/@' + username") Profile
    | #{' | '}
    router-link(to="/new") New post
    | #{' | '}
    span(v-if="loggedIn")
      | You're the user @{{ username }}&nbsp;
      button(
        v-if="loggedIn"
        @click="logout") Log Out
    router-link(
      v-else
      to="/login") Log In
</template>

<script>
import { mapState } from 'vuex'
import '@/styles/site.scss'

export default {
  name: 'Nav',
  computed: mapState({
    loggedIn: state => !!state.currentUser.token,
    username: state => state.currentUser.username
  }),
  methods: {
    logout: function () {
      this.$store.dispatch('currentUser/logout')
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import '~styles/site.scss';

#nav {
  // @include grid-column(7);
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
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
