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
          v-model="source"
          @input="checkSource")
      div(v-if="previewTitle") {{ previewTitle }}
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
        @click.prevent="submit") Save
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
import sourcesApi from '@/api/sources'
import EditorImage from './EditorImage.vue'

export default {
  name: 'Editor',
  components: {
    EditorImage
  },
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      title: this.post.title || '',
      description: this.post.description || '',
      isPrivate: this.post.isPrivate || false,
      source: this.post.source || '',
      parts: this.post.parts || [],
      checkSourceTimeout: null,
      previewTitle: ''
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
      postsApi.updatePost(this.post.id, {
        id: this.post.id,
        title: this.title,
        description: this.description,
        isPrivate: this.isPrivate,
        parts: this.parts,
        source: this.source
      }).then(this.submitOnSuccess).catch(this.submitOnFail)
    },
    submitOnSuccess: function () {
      this.$router.push(this.post.url)
    },
    submitOnFail: function (err) {
      console.log(err)
    },
    checkSource: function () {
      // Throttle API calls
      clearTimeout(this.checkSourceTimeout)
      if (this.source) {
        this.checkSourceTimeout = setTimeout(() => {
          sourcesApi.checkSource(this.source)
            .then(this.checkSourceOnSuccess)
            .catch(this.checkSourceOnFail)
        }, 1000)
      }
    },
    checkSourceOnSuccess: function ({ data }) {
      console.log(data)
      this.previewTitle = data.ogTitle
    },
    checkSourceOnFail: function (err) {
      console.log(err)
      this.previewTitle = ''
    }
  }
}
</script>

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
