<template lang="pug">
  .editor__image here's an image
    img(:src="imageUrl")
</template>

<script>
export default {
  name: 'EditorImage',
  props: {
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/300x300'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.editor__image {
  background-color:green;
}
</style>
