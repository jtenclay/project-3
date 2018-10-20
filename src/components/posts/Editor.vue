<template lang="pug">
  .editor here's the editor
    form
      label Title
        input(
          type="text"
          name="title"
          v-model="title")
      label Source
        input(
          type="text"
          name="source"
          v-model="source")
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
    div(
      class="editor__part"
      v-for="(part, index) in parts") here's a part
      button(class="editor__x" @click="removePart(index)") X
      EditorImage(
        v-if="part.type == 'image'"
        :imageUrl="part.imageUrl")
    button(@click="addPart('heading')") Add heading
    button(@click="addPart('image')") Add image
</template>

<script>
import postsApi from '@/api/posts'
import EditorImage from './EditorImage.vue'

export default {
  name: 'Editor',
  components: {
    EditorImage
  },
  props: {
    postId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      title: '',
      description: '',
      isPrivate: false,
      source: '',
      parts: []
    }
  },
  methods: {
    addPart: function (type) {
      this.parts.push({
        type,
        imageUrl: type === 'image' ? 'https://via.placeholder.com/300x300' : null
      })
    },
    removePart: function (index) {
      this.parts.splice(index, 1)
    },
    submit: function (e) {
      postsApi.updatePost({
        id: this.postId,
        title: this.title,
        description: this.description,
        isPrivate: this.isPrivate,
        parts: this.parts,
        source: this.source
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.editor {
  &__part {
    position: relative;
    background-color: yellow;
  }
  &__x {
    position: absolute;
    right: 0;
    top: 0
  }
}
</style>
