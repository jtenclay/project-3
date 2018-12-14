<template lang="pug">
  form.form
    slot
</template>

<script>
export default {
  name: 'Form'
}
</script>

<style scoped lang="sass">
.form
  label
    display: block
</style>
