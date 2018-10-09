<template>
  <div id="app" class="sans-serif">
    <Sidebar :width="sidebarWidth" :outcomeInterventionLU="outcomeInterventionLU" :selectedCell="selectedCell" :studiesLU="studiesLU"></Sidebar>
    <ScrollingEvidenceTable :interventions="interventions" :outcomes="outcomes" :outcomeGroups="outcomeGroups" :outcomeInterventionLU="outcomeInterventionLU" :action="action" :sidebarWidth="sidebarWidth" :maxStudies="maxStudies" />
  </div>
</template>

<script>
import ScrollingEvidenceTable from './components/ScrollingEvidenceTable.vue'
import Sidebar from './components/Sidebar.vue'
import {csv as d3_csv} from 'd3-request'

import {getStudies, getStudiesLU, getCategories, getOutcomeInterventionLU, getOutcomeInterventionArray, getMaxStudies} from './data-processing'

export default {
  name: 'app',
  components: {
    Sidebar,
    ScrollingEvidenceTable
  },
  data: function() {
    return {
      studies: [],
      studiesLU: {},
      outcomes: [],
      interventions: [],
      outcomeInterventionLU: {},
      outcomeGroups: [],
      maxStudies: 0,

      sidebarWidth: 400,
      selectedCell: {intervention: null, outcome: null}
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
          this.studiesLU = getStudiesLU(this.studies)

          this.outcomeInterventionLU = getOutcomeInterventionLU(outcomes, interventions, studies)
          this.outcomeGroups = getOutcomeInterventionArray(this.outcomeInterventionLU, outcomes, interventions, this.outcomeCategories, this.interventionCategories)

          this.maxStudies = getMaxStudies(this.outcomeGroups)

          console.log(err, studies, 'studies lu', this.studiesLU)
        })
      })
    })
  },
  methods: {
    action: function(type, args) {
      console.log(type, args)
      switch(type) {
      case 'selectCell':
        this.selectedCell = args
        break
      default:
        console.log('Unknown action', type)
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
