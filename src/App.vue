<template lang="pug">
  #app(v-if="!rehydrated") Loading...
  #app(v-else)
    .site-wrapper
      Nav
      router-view
</template>

<script>
import Nav from '@/components/Nav.vue'
import 'normalize.css'
import '@/styles/site.scss'

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
// @import '~styles/site';

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.site-wrapper {
  margin: 0 auto;
  max-width: 1000px;
}
</style>
