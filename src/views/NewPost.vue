<template lang="pug">
  div
    div Here's the new post page.
    form
      label Title
        input(
          type="text"
          name="title"
          v-model="title")
      label Description
        textarea(
          name="description"
          v-model="description")
      label Is Private?
        input(
          type="checkbox"
          name="isPrivate"
          v-model="isPrivate")
      button(
        type="submit"
        @click.prevent="submit") Submit
</template>

<script>
export default {
  name: 'NewPost',
  data () {
    return {
      title: '',
      description: '',
      isPrivate: false
    }
  },
  methods: {
    submit: function (e) {
      this.$store.dispatch('posts/newPost', {
        title: this.title,
        description: this.description,
        isPrivate: this.isPrivate
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
