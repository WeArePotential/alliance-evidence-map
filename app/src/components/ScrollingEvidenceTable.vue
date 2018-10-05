<template>

  <div class="scrollable-table">
    <div class="fixed-corner"></div>

    <div class="fixed-row" v-bind:style="{left: x + 'px'}">
      <div class="fixed-row-cell"></div>
      <div class="fixed-row-cell" v-for="(intervention, i) in interventions" v-bind:style="{left: (i + 1) * 100 + 'px'}">{{intervention.Intervention}}</div>
    </div>

    <div class="fixed-col" v-bind:style="{top: y + 'px'}">
      <div class="fixed-col-cell" v-for="(outcome, i) in outcomes" v-bind:style="{top: (150 + i * 100) + 'px'}">{{outcome.Outcome}}</div>
    </div>

    <div class="grid-wrapper">
      <div class="grid-inner">
        <svg v-bind:width="numCols * cellSize" v-bind:height="numRows * cellSize"  v-if="outcomeGroups.length > 0">
          <g v-bind:transform="'translate(' + x + ',' + y + ')'">
            <g v-for="(outcome, i) in outcomeGroups[0].outcomes" v-bind:transform="`translate(0, ${i * 100})`">
              <g v-for="(d, i) in outcome.interventions" v-bind:transform="`translate(${i * 100}, 0)`" v-on:click="handleCellClick()">
                <circle cx="50" cy="50" v-bind:r="d.data.for.high.length * 20" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>


<script>
import {drag as d3_drag} from 'd3-drag'
import {select as d3_select, event as d3_event} from 'd3-selection'

export default {
  name: 'ScrollingEvidenceTable',
  props: {
    outcomes: Array,
    interventions: Array,
    outcomeGroups: Array
  },
  data: function() {
    return {
      x: 0,
      y: 0,
      cellSize: 100,
      drag: d3_drag().on('drag', () => {
        console.log('drag')
        this.x += d3_event.dx
        if(this.x > 0) this.x = 0
        this.y += d3_event.dy
        if(this.y > 0) this.y = 0
      })
    }
  },
  computed: {
    numRows: function() {
      // console.log('outcomes', this.outcomes)
      return this.outcomes ? this.outcomes.length : 0
    },
    numCols: function() {
      return this.interventions.length
    }
  },
  mounted: function() {
    console.log('mounted', d3_select('.grid-inner').node())
    d3_select('.grid-inner')
      .call(this.drag)
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

.grid-wrapper {
  width: 2000px;
  height: 1000px;
  background-color: #eee;
  position: absolute;
  top: 150px;
  left: 100px;
}

.grid-inner {
  position: absolute;
}

.grid-inner svg {
  width: 2000px;
  height: 1000px;
}

.grid-cell {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px solid #fff;
  text-align: center;
  line-height: 100px;
}

</style>
