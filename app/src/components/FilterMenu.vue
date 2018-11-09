<template>
  <div id="filter-menu">
    <div class="filter">
      <div class="label">Country</div>
      <select v-model="filters.countries">
        <option v-for="country in countries">{{country}}</option>
      </select>
    </div>

    <div class="filter">
      <div class="label">Population</div>
      <select v-model="filters.population">
        <option v-for="population in populations">{{population}}</option>
      </select>
    </div>

<!-- v-on:change="setFilter('countries', $event)" -->
<!-- v-on:change="setFilter('population', $event)" -->
<!--
    <div class="filter">
      <div class="label">Type of study</div>
      <select v-on:change="setFilter('studyType', $event)">
        <option v-for="type in studyTypes">{{type}}</option>
      </select>
    </div>

    <div class="filter">
      <div class="label">Internal / External</div>
      <select v-on:change="setFilter('internalExternal', $event)">
        <option v-for="type in internalExternalTypes">{{type}}</option>
      </select>
    </div>
-->
    <div class="filter">
      <div class="label">Strength of evidence</div>
      <select v-model="filters.strengthOfEvidence">
        <option v-for="strength in evidenceStrengths" :value="strength">{{strength | capitalize }}</option>
      </select>
    </div>

    <div class="filter">
      <div class="label">For / against evidence</div>
      <select v-model="filters.forAgainstEvidence">
        <option v-for="type in forAgainstEvidenceTypes" :value="type">{{type | capitalize}}</option>
      </select>
    </div>

    <div class="reset-button" v-on:click="resetFilter()">Reset filter</div>
  </div>
</template>


<script>
import uniq from 'lodash/uniq'

export default {
  name: 'FilterMenu',
  props: {
    studies: Array,
    filters: Object,
    action: Function
  },
  data: function() {
    return {
    }
  },
  methods: {
    // setFilter: function(id, e) {
    //   this.action('setFilter', {filter: id, value: e.target.value})
    // },
    resetFilter: function() {
      this.action('resetFilter')
    }
  },
  computed: {
    countries: function() {
      let countries = []
      this.studies.forEach(d => {
        d.countries.forEach(c => {
          if(c === '') return
          countries.push(c)
        })
      })
      countries = uniq(countries)
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
      population.sort()
      population.unshift('All')
      return population
    },
    studyTypes: function() {
      let types = uniq(this.studies.map(d => d.studyType))
      types.unshift('All')
      return types
    },
    internalExternalTypes: function() {
      return ['All', 'Internal', 'External']
    },
    evidenceStrengths: function() {
      let strengths = ['All', 'low', 'moderate', 'high']
      return strengths
    },
    forAgainstEvidenceTypes: function() {
      let types = ['All', 'for', 'against']
      return types
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#filter-menu {
  padding: 0 10px;
}
.filter {
  padding: 0 20px 20px 0;
  display: inline-block;
}
.label {
  font-size: 12px;
  margin-bottom: 2px;
}
.filter select {
  width: 160px;
  padding: 2px;
}
.reset-button {
  font-size: 12px;
  text-decoration: underline;
  text-align: right;
  color: #777;
  cursor: pointer;
}
</style>
