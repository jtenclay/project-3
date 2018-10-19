<template lang="pug">
  div
    div Here's the login page.
    form
      label Email
        input(
          type="text"
          name="email"
          v-model="email")
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
      email: '',
      password: ''
    }
  },
  methods: {
    submit: function (e) {
      this.$store.dispatch('currentUser/login', {
        email: this.email,
        password: this.password
      }).then(this.submitOnSuccess).catch(this.submitOnFail)
    },
    submitOnSuccess: function (data) {
      this.$router.push(`/@${data.user.username}`)
    },
    submitOnFail: function (err) {
      console.log(err)
    }
  }
}
</script>
