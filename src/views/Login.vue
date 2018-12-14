<template lang="pug">
  div
    div Here's the login page.
    Form
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
      button(
        type="submit"
        @click.prevent="submit") Log In
    router-link(
      to="/sign-up") Sign Up
</template>

<script>
import Form from '@/components/common/Form.vue'

export default {
  name: 'Login',
  components: {
    Form
  },
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
