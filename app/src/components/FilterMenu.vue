<template>
  <div id="filter-menu">
    <div>
      <div class="filter" style="width: 100%;">
        <div class="label">Region</div>
        <multiselect v-model="filters.regions" :options="regions" :multiple="true" :searchable="false" :hide-selected="true" placeholder="Select region(s)"></multiselect>
      </div>
    </div>

    <div>
      <div class="filter" style="width: 100%;">
        <div class="label">Country</div>
        <multiselect v-model="filters.countries" :options="countries" :multiple="true" :searchable="false" :hide-selected="true" placeholder="Select country(s)"></multiselect>
      </div>
    </div>

    <div>
      <div class="filter" style="width: 100%;">
        <div class="label">Population</div>
        <multiselect v-model="filters.population" :options="populations" :multiple="true" :searchable="false" :hide-selected="true" placeholder="Select population(s)"></multiselect>
      </div>
    </div>

    <!--
         <div class="filter">
         <div class="label">Type of study</div>
         <select v-on:change="setFilter('studyType', $event)">
         <option v-for="type in studyTypes">{{type}}</option>
         </select>
         </div>
    -->

    <div>
      <div class="filter" style="width: 100%;">
        <div class="label">Strength of evidence</div>
        <multiselect v-model="filters.strengthOfEvidence" :options="evidenceStrengths" :multiple="true" :searchable="false" :hide-selected="true" placeholder="Select strength(s) of evidence"></multiselect>
      </div>
    </div>

    <div class="filter">
      <div class="label">Internal / External</div>
      <select v-model="filters.internalExternal">
        <option v-for="type in internalExternalTypes" :key="type">{{type}}</option>
      </select>
    </div>

    <!-- <div class="filter">
         <div class="label">For / against evidence</div>
         <select v-model="filters.forAgainstEvidence">
         <option v-for="type in forAgainstEvidenceTypes" :value="type" :key="type">{{type | capitalize}}</option>
         </select>
         </div> -->

    <div class="reset-button" v-on:click="resetFilter()">Reset filter</div>
  </div>
</template>


<script>
import uniq from 'lodash/uniq'
import Multiselect from 'vue-multiselect'

import { regionNames } from '../region-lookup'

export default {
  name: 'FilterMenu',
  components: {
    Multiselect
  },
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
    regions: function() {
      return regionNames
    },
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
      return population
    },
    /* studyTypes: function() {
     *   let types = uniq(this.studies.map(d => d.studyType))
     *   types.unshift('All')
     *   return types
     * }, */
    internalExternalTypes: function() {
      return ['All', 'Internal', 'External']
    },
    evidenceStrengths: function() {
      let strengths = ['low', 'moderate', 'high']
      return strengths
    },
    /* forAgainstEvidenceTypes: function() {
     *   let types = ['All', 'for', 'against']
     *   return types
     * } */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
  margin-bottom: 10px;
}
</style>

<style>
#filter-menu .multiselect__option--highlight, #filter-menu .multiselect__tag {
  background: #36b0e3;
}
#filter-menu .multiselect__option--highlight:after {
  display: none;
}
#filter-menu .multiselect__tag-icon:hover {
  background: #e52e78;
}
#filter-menu input, #filter-menu .multiselect__tags {
  border-color: #333;
  border-radius: 2px;
}
</style>
