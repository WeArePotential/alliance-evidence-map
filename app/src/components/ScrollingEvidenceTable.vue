<template>


  <div class="scrollable-table">
    <div class="fixed-corner"></div>

    <div class="fixed-row" v-bind:style="{left: x + 'px'}">
      <div class="fixed-row-cell"></div>
      <div class="fixed-row-cell" v-for="(intervention, i) in interventions" v-bind:style="{left: (i + 1) * 100 + 'px'}">{{intervention.Intervention}}</div>
    </div>

    <div class="fixed-col" v-bind:style="{top: y + 'px'}">
      <!-- <div v-for="group in outcomeGroups"> -->
      <div class="fixed-col-cell" v-for="(outcome, i) in outcomeGroups[0].outcomes" v-bind:style="{top: (150 + i * 100) + 'px'}">{{outcome.outcome}}</div>
      <!-- </div> -->
    </div>

    <div class="grid-wrapper">
      <div class="grid-inner">
        <svg v-bind:width="numCols * cellSize" v-bind:height="numRows * cellSize">
          <g v-bind:transform="'translate(' + x + ',' + y + ')'">
            <g v-for="(outcome, i) in outcomeGroups[0].outcomes" v-bind:transform="`translate(0, ${i * 100 + 50})`">
              <circle v-for="(d, i) in row" v-bind:r="d" v-bind:cx="i * 100 + 50" cy="0" v-on:click="handleCellClick()" />
            </g>
          </g>
        </svg>
      </div>
    </div>

  </div>


  <!-- <div class="evidence-table-container">
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
    </table> -->
    <!-- <div>
      <div>
        <div>
          <div class="cell"></div>
          <div class="cell" v-for="intervention in interventions">{{intervention.Intervention}}</div>
        </div>
      </div>
      <div v-for="group in outcomeGroups">
        <div>
          <div v-bind:colspan="interventions.length + 1" class="outcome-group-header">{{group.name}}</div>
        </div>
        <div v-for="outcome in group.outcomes">
          <div class="cell">{{outcome.outcome}}</div>
          <div  class="cell" v-for="iv in outcome.interventions">
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
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'EvidenceTable',
  props: {
    outcomes: Array,
    interventions: Array,
    outcomeGroups: Array
  },
  data: function() {
    return {
      x: 0,
      y: 0,
      cellSize: 100
    }
  },
  computed: {
    numRows: function() {
      return this.outcomeGroups[0].outcomes.length
    },
    numCols: function() {
      return this.interventions.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scrollable-table {
  margin-left: 200px;
  position: relative;
  font-size: 12px;
}

.scrollable-table svg {
  overflow: hidden;
}

.fixed-corner {
  height: 100px;
  width: 100px;
  background-color: white;
  z-index: 150;
  position: absolute;
}
.fixed-row {
  z-index: 100;
  background-color: #fff;
  position: relative;
}

.fixed-row-cell {
  position: absolute;
  top: 0;
  width: 100px;
  text-align: center;
  height: 150px;
  /* overflow: hidden; */
}

.fixed-col {
  width: 100px;
  z-index: 100;
  background-color: #fff;
  position: relative;
}

.fixed-col-cell {
  position: absolute;
  width: 100px;
  /* text-align: cr; */
  height: 100px;
  /* line-height: 100px; */
}


</style>
