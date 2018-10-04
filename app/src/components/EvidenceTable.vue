<template>
  <div class="evidence-table-container">
    <table>
      <thead>
        <tr>
          <td></td>
          <td v-for="intervention in interventions">{{intervention.Intervention}}</td>
        </tr>
      </thead>
      <tbody v-for="group in outcomeGroups">
        <tr>
          <td v-bind:colspan="interventions.length + 1" class="outcome-group-header">{{group.name}}</td>
        </tr>
        <tr v-for="outcome in group.outcomes">
          <td>{{outcome.outcome}}</td>
          <td v-for="iv in outcome.interventions">
            <div>
              {{iv.data.for.low.length}},
              {{iv.data.for.moderate.length}},
              {{iv.data.for.high.length}}
            </div>
            <div>
              {{iv.data.against.low.length}},
              {{iv.data.against.moderate.length}},
              {{iv.data.against.high.length}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'EvidenceTable',
  props: {
    outcomes: Array,
    interventions: Array,
    outcomeGroups: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  font-size: 12px;
}
td.outcome-group-header {
  background-color: #eee;
}
</style>
