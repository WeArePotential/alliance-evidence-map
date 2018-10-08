<template>
  <circle cx="50" cy="50" v-bind:r="radius" />
</template>


<script>
export default {
  name: 'Barchart',
  props: {
    data: Object,
    size: Number,
    maxStudies: Number
  },
  computed: {
    radius: function() {
      return this.data.for.high.length * 20
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
