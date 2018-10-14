<template lang="pug">
  .editor here's the editor
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
import EditorImage from './EditorImage.vue'
// import { mapState } from 'vuex'

export default {
  name: 'Editor',
  components: {
    EditorImage
  },
  data () {
    return {
      parts: []
    }
  },
  methods: {
    addPart: function (type) {
      this.parts.push({
        type,
        imageUrl: 'https://via.placeholder.com/300x300'
      })
    },
    removePart: function (index) {
      this.parts.splice(index, 1)
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
