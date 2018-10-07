<template lang="pug">
  div Hey there, you're on the route for user {{ $route.params.user_id }}
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Profile',
  components: {
    // HelloWorld
  }
}
</script>
