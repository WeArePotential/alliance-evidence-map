<template>
  <div id="sidebar" :style="{width: width + 'px'}">
    <div v-if="selectedCell.intervention !== null">
      <h5 class="f5">Intervention</h5 class="f5">
      <div>{{selectedCell.intervention}}</div>
      <h5 class="f5">Outcome</h5 class="f5">
      <div>{{selectedCell.outcome}}</div>

      <div class="study-groups">
        <h2>Strong evidence (for)</h2>
        <StudyList :ids="studyGroups.for.high" :studiesLU="studiesLU" />

        <h2>Moderate evidence (for)</h2>
        <StudyList :ids="studyGroups.for.moderate" :studiesLU="studiesLU" />

        <h2>Low evidence (for)</h2>
        <StudyList :ids="studyGroups.for.low" :studiesLU="studiesLU" />

        <h2>Strong evidence (against)</h2>
        <StudyList :ids="studyGroups.against.high" :studiesLU="studiesLU" />

        <h2>Moderate evidence (against)</h2>
        <StudyList :ids="studyGroups.against.moderate" :studiesLU="studiesLU" />

        <h2>Low evidence (against)</h2>
        <StudyList :ids="studyGroups.against.low" :studiesLU="studiesLU" />
      </div>
    </div>
  </div>
</template>


<script>
import StudyList from './StudyList.vue'

export default {
  name: 'Sidebar',
  components: {
    StudyList
  },
  props: {
    width: Number,
    outcomeInterventionLU: Object,
    selectedCell: Object,
    studiesLU: Object
  },
  // beforeCreate: function() {
  //   // console.log('beforeCreate', selectedCell)
  // },
  data: function() {
    return {
    }
  },
  computed: {
    studyGroups: function() {
      return this.outcomeInterventionLU[this.selectedCell.outcome][this.selectedCell.intervention]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 200;
  overflow-y: scroll;
  font-size: 14px;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
