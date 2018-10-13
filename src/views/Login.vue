<template lang="pug">
  div
    div Here's the login page.
    form
      label Username
        input(
          type="text"
          name="username"
          v-model="username")
      label Password
        input(
          type="password"
          name="password"
          v-model="password")
      button(
        type="submit"
        @click.prevent="submit") Log In
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submit: function (e) {
      this.$store.dispatch('users/login', {
        username: this.username,
        password: this.password
      }).then(this.submitOnSuccess).catch(this.submitOnFail)
    },
    submitOnSuccess: function () {
      console.log('successful')
    },
    submitOnFail: function (err) {
      console.log(err)
    }
  }
}
</script>
