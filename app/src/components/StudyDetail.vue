<template>
  <div class="study">
    <div class="section title serif">{{study.title}}</div>
    <div class="field"><span>Authors:</span> {{study.authors}}</div>
    <div class="field"><span>Organisations:</span> {{study.orgsInvolved}}</div>
    <div class="field"><span>Publication date:</span> {{study.date}}</div>
    <div class="summary serif">
      <div v-if="expanded" v-html="sanitisedSummary" />
      <div v-else><span v-html="sanitisedSummary.slice(0, 200)" /><span>...</span></div>
    </div>

    <div v-if="expanded" class="field"><span>Link:</span><a class="dim" :href="study.url" target="_blank"> {{study.url}}</a></div>
    <div v-if="expanded" class="field"><span>Country:</span> {{study.countries.join(', ')}}</div>
    <div v-if="expanded" class="field"><span>Population:</span> {{study.population.join(', ')}}</div>

    <div class="expand-button noselect dim" v-on:click="handleClick"><span v-if="expanded">Less</span><span v-else>More</span></div>
  </div>
</template>


<script>
import striptags from 'striptags'

export default {
  name: 'StudyDetail',
  props: {
    study: Object,
  },
  data: function() {
    return {
      expanded: false
    }
  },
  methods: {
    handleClick: function() {
      this.expanded = !this.expanded
    }
  },
  computed: {
    sanitisedSummary: function() {
      return striptags(this.study.summary, ['p', 'a'])
    }
  }
}
</script>

<style scoped>
.study {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
}
.study .title {
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 1.25em;
}
.study .summary {
  margin: 10px 0;
  /* font-size: 14px; */
}
.study .field {
  margin-bottom: 5px;
}
.study .field span:first-child {
  font-weight: bold;
}
.expand-button {
  text-decoration: underline;
  text-align: right;
  cursor: pointer;
  color: #a71930;
}
</style>
