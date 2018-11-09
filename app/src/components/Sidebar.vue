<template>
  <div id="sidebar" :style="{width: width + 'px'}">
    <div class="section">
      <h3 class="">International HIV and AIDS Alliance Evidence map of community action on HIV, health and rights</h3>
      <p>Interventions are presented on the horizontal axis and Outcomes are presented on the vertical axis.</p>
      <p>Lorem ipsum dolor sit amet, definiebas intellegam ius cu, pri ei epicurei rationibus, ex eum dicta sonet invidunt. Ei mea nihil discere appareat, ut usu reque facilis assueverit, et vix oblique periculis omittantur. Ne eros verear instructior sed, vero scribentur nec te. No convenire euripidis vulputate sit. Id scaevola expetenda cotidieque his.</p>
    </div>
    <div class="heading">FILTER</div>
    <FilterMenu :studies="studies" :action="action" :filters="filters" />
    <div class="info" v-if="selectedCell.intervention !== null">
      <div class="section selected-intervention">
        <div class="heading">SELECTED INTERVENTION</div>
        <div class="content">{{selectedCell.intervention}}</div>
      </div>
      <div class="section selected-outcome">
        <div class="heading">SELECTED OUTCOME</div>
        <div class="content">{{selectedCell.outcome}}</div>
      </div>

      <div class="section">
        <div v-bind:class="{heading: true, animated: emphasiseChange, infinite: true, bounce: true}">STUDIES ({{numFoundStudies}} found)</div>
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
    filters: Object,
    emphasiseChange: Boolean,
    action: Function
  },
  data: function() {
    return {
    }
  },
  computed: {
    studyGroups: function() {
      return this.outcomeInterventionLU[this.selectedCell.outcome][this.selectedCell.intervention]
    },
    numFoundStudies: function() {
      let num = this.studyGroups.for.high.length + this.studyGroups.for.moderate.length + this.studyGroups.for.low.length + this.studyGroups.against.high.length + this.studyGroups.against.moderate.length + this.studyGroups.against.low.length
      return num
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
  border-right: 1px solid #aaa;
  box-sizing: border-box;
}

h3 {
  padding: 0 10px;
}
.section {
  padding-bottom: 20px;
}
.section.selected-intervention {
  background-color: #999;
  font-weight: bold;
}
.section.selected-outcome {
  background-color: #ddd;
  font-weight: bold;
}
.section p {
  padding: 0 10px;
}

.heading {
  text-align: center;
  background-color: #a71930;
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
