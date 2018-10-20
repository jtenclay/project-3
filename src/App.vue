<template lang="pug">
  #app(v-if="!rehydrated") Loading...
  #app(v-else)
    Nav
    router-view
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  components: {
    Nav
  },
  data () {
    return {
      rehydrated: false
    }
  },
  created () {
    this.$store.dispatch('currentUser/rehydrate')
      .then(this.rehydrateOnComplete)
      .catch(this.rehydrateOnComplete)
  },
  methods: {
    rehydrateOnComplete () {
      this.rehydrated = true
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
