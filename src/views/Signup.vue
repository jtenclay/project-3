<template lang="pug">
  div
    div Here's the signup page.
    form
      label Username
        input(
          type="text"
          name="username"
          v-model="username")
      label Email
        input(
          type="email"
          name="email"
          v-model="email")
      label Password
        input(
          type="password"
          name="password"
          v-model="password")
      label First name
        input(
          type="text"
          name="firstName"
          v-model="firstName")
      label Last name
        input(
          type="text"
          name="lastName"
          v-model="lastName")
      button(
        type="submit"
        @click.prevent="submit") Sign up
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    submit: function (e) {
      this.$store.dispatch('currentUser/signup', {
        username: this.username,
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      }).then(this.submitOnSuccess).catch(this.submitOnFail)
    },
    submitOnSuccess: function (data) {
      this.$router.push(`/@${data.user.username}/`)
    },
    submitOnFail: function (err) {
      console.log(err)
    }
  }
}
</script>
