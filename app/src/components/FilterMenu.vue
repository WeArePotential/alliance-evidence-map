<template>
  <div id="filter-menu">
    <div class="filter">
      <div class="label">Country</div>
      <select v-on:change="setFilter('country', $event)">
        <option v-for="country in countries">{{country}}</option>
      </select>
    </div>

    <div class="filter">
      <div class="label">Population</div>
      <select v-on:change="setFilter('population', $event)">
        <option v-for="population in populations">{{population}}</option>
      </select>
    </div>

    <div class="filter">
      <div class="label">Type of study</div>
      <select v-on:change="setFilter('studyType', $event)">
        <option v-for="type in studyTypes">{{type}}</option>
      </select>
    </div>

    <div class="filter">
      <div class="label">Strength of evidence</div>
      <select v-on:change="setFilter('strengthOfEvidence', $event)">
        <option v-for="strength in evidenceStrengths" :value="strength">{{strength | capitalize }}</option>
      </select>
    </div>

    <div class="filter">
      <div class="label">For / against evidence</div>
      <select v-on:change="setFilter('forAgainstEvidence', $event)">
        <option v-for="type in forAgainstEvidenceTypes" :value="type">{{type | capitalize}}</option>
      </select>
    </div>
  </div>
</template>


<script>
import uniq from 'lodash/uniq'

export default {
  name: 'FilterMenu',
  props: {
    studies: Array,
    action: Function
  },
  data: function() {
    return {
    }
  },
  methods: {
    setFilter: function(id, e) {
      this.action('setFilter', {filter: id, value: e.target.value})
    }
  },
  computed: {
    countries: function() {
      let countries = uniq(this.studies.map(d => d.country))
      countries.sort()
      countries.unshift('All')
      return countries
    },
    populations: function() {
      let population = []
      this.studies.forEach(d => {
        d.population.forEach(p => {
          if(p === '') return
          population.push(p)
        })
      })
      population = uniq(population)
      population.unshift('All')
      return population
    },
    studyTypes: function() {
      let types = uniq(this.studies.map(d => d.studyType))
      types.unshift('All')
      return types
    },
    evidenceStrengths: function() {
      // let strengths = uniq(this.studies.map(d => d.strengthOfEvidence))
      // strengths.unshift('All')
      let strengths = ['All', 'low', 'moderate', 'high']
      return strengths
    },
    forAgainstEvidenceTypes: function() {
      // let types = uniq(this.studies.map(d => d.forAgainstEvidence))
      // types.unshift('All')
      let types = ['All', 'for', 'against']
      return types
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter {
  padding: 0 0 20px 10px;
}
.label {
  font-size: 12px;
  margin-bottom: 2px;
}
.filter select {
  padding: 2px;
}
</style>
