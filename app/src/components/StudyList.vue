<template>
  <div class="study-list">
    <div class="study" v-for="id in ids">
      <div class="f3">{{studiesLU[id].Title}}</div>
      <div class="summary">{{studiesLU[id].Summary}}</div>
      <div>Type: {{studiesLU[id].Type}}</div>
      <div>Programme: {{studiesLU[id].Programme}}</div>
      <div>Theme: {{studiesLU[id].Theme}}</div>
      <div>Status: {{studiesLU[id].Status}}</div>
      <div>Date: {{studiesLU[id].Date}}</div>
      <div>Contact: {{studiesLU[id].Contact}}</div>
      <div>Orgs involved: {{studiesLU[id]['Orgs involved']}}</div>
      <div>Notes: {{studiesLU[id].Notes}}</div>
      <div>Region: {{studiesLU[id].Region}}</div>
      <div>Primary study / Review: {{studiesLU[id]['Primary study / Review']}}</div>
      <div>Internal / External: {{studiesLU[id]['Internal / External']}}</div>
      <div><a :href="studiesLU[id].Link">External link</a></div>

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
