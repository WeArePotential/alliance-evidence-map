<template>
  <div id="app">
    <EvidenceTable msg="Welcome!" v-bind:data="outcomeInterventionArray" />
  </div>
</template>

<script>
import EvidenceTable from './components/EvidenceTable.vue'
import {csv as d3_csv} from 'd3-request'

import {getStudies, getCategories, getOutcomeInterventionLU, getOutcomeInterventionArray} from './data-processing'

export default {
  name: 'app',
  components: {
    EvidenceTable
  },
  data: function() {
    return {
      studies: [],
      outcomes: [],
      interventions: [],
      outcomeInterventionLU: {},
      outcomeInterventionArray: []
    }
  },
  mounted: function() {
    d3_csv('data/interventions.csv', (err, interventions) => {
      d3_csv('data/outcomes.csv', (err, outcomes) => {
        d3_csv('data/evidence-data.csv', (err, studies) => {
          this.interventions = interventions
          this.interventionCategories = getCategories(this.interventions)
          this.outcomes = outcomes
          this.outcomeCategories = getCategories(this.outcomes)
          this.studies = getStudies(studies)

          this.outcomeInterventionLU = getOutcomeInterventionLU(outcomes, interventions, studies)
          this.outcomeInterventionArray = getOutcomeInterventionArray(this.outcomeInterventionLU, outcomes, interventions, this.outcomeCategories, this.interventionCategories)
          console.log(err, studies, 'lu', this.outcomeInterventionLU)
        })
      })
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
