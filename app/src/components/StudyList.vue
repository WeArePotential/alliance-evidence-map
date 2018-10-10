<template>
  <div class="study-list">
    <div class="study" v-for="id in ids">
      <div class="f3">{{studiesLU[id].title}}</div>
      <div class="summary">{{studiesLU[id].summary}}</div>
      <div>Date: {{studiesLU[id].date}}</div>
      <div>Orgs involved: {{studiesLU[id].orgsInvolved}}</div>
      <div><a :href="studiesLU[id].url">External link</a></div>

    </div>
  </div>
</template>


<script>
export default {
  name: 'StudyList',
  props: {
    ids: Array,
    studiesLU: Object
  },
  // beforeCreate: function() {
  //   // console.log('beforeCreate', selectedCell)
  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.study {
  margin-bottom: 40px;
}
</style>
