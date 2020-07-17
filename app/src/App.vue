<template>
  <div id="app" class="sans-serif">
    <Sidebar :width="sidebarWidth" :outcomeInterventionLU="filteredOutcomeInterventionLU" :selectedCell="selectedCell" :studiesLU="studiesLU" :studies="studies" :filters="filters " :emphasiseChange="emphasiseChange" :action="action"></Sidebar>
    <ScrollingEvidenceTable :interventions="interventions" :interventionGroups="interventionGroups" :outcomes="outcomes" :outcomeGroups="outcomeGroups" :outcomeInterventionLU="filteredOutcomeInterventionLU" :action="action" :sidebarWidth="sidebarWidth" :maxStudies="maxStudies" :selectedCell="selectedCell" />
  </div>
</template>

<script>
import ScrollingEvidenceTable from './components/ScrollingEvidenceTable.vue'
import Sidebar from './components/Sidebar.vue'
import {csv as d3_csv} from 'd3-request'
import filter from 'lodash/filter'

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
      emphasiseChange: false,

      filters: {
        filterIds: ['countries', 'population',/* 'studyType',*/ 'internalExternal', 'strengthOfEvidence', 'forAgainstEvidence'],
        filterType: ['multi', 'multi',/* 'single',*/ 'single', 'multi', 'single'],
        countries: [],
        population: [],
        // studyType: 'All',
        strengthOfEvidence: [],
        internalExternal: 'All',
        forAgainstEvidence: 'All'
      }
    }
  },
  mounted: function() {
    d3_csv('data/interventions.csv?3', (err, interventionsCsv) => {
      d3_csv('data/outcomes.csv?3', (err, outcomesCsv) => {
        d3_csv('data/evidence-map.csv?3', (err, studiesCsv) => {
          interventionsCsv = filter(interventionsCsv, d => d.Intervention)
          outcomesCsv = filter(outcomesCsv, d => d.Outcome)
          studiesCsv = filter(studiesCsv, d => d.Title)
          studiesCsv = filter(studiesCsv, d => d.Eligibility && d.Eligibility[0].toUpperCase() === 'Y')

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
          this.setEmphasiseChange()
          break
          // case 'setFilter':
          //   this.setEmphasiseChange()
          //   break
        case 'resetFilter':
          this.filters.filterIds.forEach((d, i) => this.filters[d] = this.filters.filterType[i] === 'single' ? 'All' : [])
          break
        default:
          console.log('Unknown action', type)
      }
    },
    setEmphasiseChange() {
      this.emphasiseChange = true
      window.setTimeout(() => {
        this.emphasiseChange = false
      }, 3000)
    }
  },
  watch: {
    filters: {
      handler: function() {
        this.setEmphasiseChange()
      },
      deep: true
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
