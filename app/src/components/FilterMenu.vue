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
      countries.unshift('All')
      return countries
    },
    populations: function() {
      let population = []
      this.studies.forEach(d => {
        d.population.forEach(p => {
          population.push(p)
        })
      })
      population = uniq(population)
      population.unshift('All')
      return population
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
  padding: 5px;
}
</style>
