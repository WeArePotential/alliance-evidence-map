<template>
  <div id="app" class="sans-serif">
    <Sidebar :width="sidebarWidth" :outcomeInterventionLU="filteredOutcomeInterventionLU" :selectedCell="selectedCell" :studiesLU="studiesLU" :studies="studies" :action="action"></Sidebar>
    <ScrollingEvidenceTable :interventions="interventions" :interventionGroups="interventionGroups" :outcomes="outcomes" :outcomeGroups="outcomeGroups" :outcomeInterventionLU="filteredOutcomeInterventionLU" :action="action" :sidebarWidth="sidebarWidth" :maxStudies="maxStudies" :selectedCell="selectedCell" />
  </div>
</template>

<script>
import ScrollingEvidenceTable from './components/ScrollingEvidenceTable.vue'
import Sidebar from './components/Sidebar.vue'
import {csv as d3_csv} from 'd3-request'

import {getOutcomes, getInterventions, getOutcomeGroups, getInterventionGroups, getStudies, getStudiesLU, getOutcomeInterventionLU, getMaxStudies, getFilteredStudies} from './data-processing'

export default {
  name: 'app',
  components: {
    Sidebar,
    ScrollingEvidenceTable
  },
  data: function() {
    return {
      outcomes: [],
      outcomeGroups: [],
      interventions: [],
      interventionGroups: [],

      studies: [],
      studiesLU: [],
      outcomeInterventionLU: {},

      maxStudies: 0,

      sidebarWidth: 400,
      selectedCell: {intervention: null, outcome: null},

      filters: {
        filterIds: ['country', 'population', 'studyType', 'strengthOfEvidence', 'forAgainstEvidence'],
        country: 'All',
        population: 'All',
        studyType: 'All',
        strengthOfEvidence: 'All',
        forAgainstEvidence: 'All'
      }
    }
  },
  mounted: function() {
    d3_csv('data/interventions.csv', (err, interventionsCsv) => {
      d3_csv('data/outcomes.csv', (err, outcomesCsv) => {
        d3_csv('data/studies.csv', (err, studiesCsv) => {
          this.outcomes = getOutcomes(outcomesCsv)
          this.outcomeGroups = getOutcomeGroups(outcomesCsv)

          this.interventions = getInterventions(interventionsCsv)
          this.interventionGroups = getInterventionGroups(interventionsCsv)

          this.studies = getStudies(interventionsCsv, outcomesCsv, studiesCsv)
          this.studiesLU = getStudiesLU(this.studies)
          this.outcomeInterventionLU = getOutcomeInterventionLU(this.interventions, this.outcomes, this.studies)

          this.maxStudies = getMaxStudies(this.interventions, this.outcomes, this.outcomeInterventionLU)
        })
      })
    })
  },
  computed: {
    filteredOutcomeInterventionLU: function() {
      // let filteredStudies = this.studies
      let filteredStudies = getFilteredStudies(this.studies, this.filters)
      return getOutcomeInterventionLU(this.interventions, this.outcomes, filteredStudies)
    }
  },
  methods: {
    action: function(type, args) {
      // console.log(type, args)
      switch(type) {
      case 'selectCell':
        this.selectedCell = args
        break
      case 'setFilter':
        this.filters[args.filter] = args.value
        break
      default:
        console.log('Unknown action', type)
      }
    }
  }
}
</script>

<style>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app a, #app a:visited {
  color: #333;
}
</style>
