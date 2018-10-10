<template>
  <div v-if="ids.length > 0" class="study-list">
    <div v-on:click="handleClick">
      <div class="heading noselect">
        <span><span v-if="open">-</span><span v-else>+</span></span>
        <span> {{title}} ({{ids.length}} <span v-if="ids.length === 1">study</span><span v-else>studies</span>)</span>
      </div>
    </div>
    <div class="studies" v-if="open">
      <StudyDetail v-for="id in ids" :study="studiesLU[id]" />
    </div>
  </div>
</template>


<script>
import StudyDetail from './StudyDetail.vue'

export default {
  name: 'StudyList',
  components: {
    StudyDetail
  },
  props: {
    title: String,
    ids: Array,
    studiesLU: Array
  },
  data: function() {
    return {
      open: false
    }
  },
  methods: {
    handleClick: function() {
      console.log('click')
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
.study-list {
  padding: 0 10px;
}
.heading {
  margin-bottom: 10px;
  font-weight: bold;
  cursor: pointer;
}
</style>
