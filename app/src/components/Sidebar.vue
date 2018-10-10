<template>
  <div id="sidebar" :style="{width: width + 'px'}">
    <div class="heading">FILTER</div>
    <FilterMenu :studies="studies" :action="action" />
    <div class="info" v-if="selectedCell.intervention !== null">
      <div class="section">
        <div class="heading">SELECTED INTERVENTION</div>
        <div class="content">{{selectedCell.intervention}}</div>
      </div>
      <div class="section">
        <div class="heading">SELECTED OUTCOME</div>
        <div class="content">{{selectedCell.outcome}}</div>
      </div>

      <div class="section">
        <div class="heading">STUDIES</div>
        <div class="study-groups">
          <StudyList title="Strong evidence (for)" :ids="studyGroups.for.high" :studiesLU="studiesLU" />
          <StudyList title="Moderate evidence (for)" :ids="studyGroups.for.moderate" :studiesLU="studiesLU" />
          <StudyList title="Low evidence (for)" :ids="studyGroups.for.low" :studiesLU="studiesLU" />
          <StudyList title="Strong evidence (against)" :ids="studyGroups.against.high" :studiesLU="studiesLU" />
          <StudyList title="Moderate evidence (against)" :ids="studyGroups.against.moderate" :studiesLU="studiesLU" />
          <StudyList title="Low evidence (against)" :ids="studyGroups.against.low" :studiesLU="studiesLU" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import FilterMenu from './FilterMenu.vue'
import StudyList from './StudyList.vue'

export default {
  name: 'Sidebar',
  components: {
    FilterMenu,
    StudyList
  },
  props: {
    width: Number,
    outcomeInterventionLU: Object,
    selectedCell: Object,
    studiesLU: Array,
    studies: Array,
    action: Function
  },
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
  /* padding: 0 10px; */
  box-sizing: border-box;
}

.section {
  margin-bottom: 20px;
}

.heading {
  text-align: center;
  background-color: #555;
  color: white;
  padding: 5px;
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 10px;
}

.content {
  padding: 0 10px;
}
</style>
