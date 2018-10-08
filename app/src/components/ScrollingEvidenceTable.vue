<template>

  <div class="scrollable-table">
    <div class="fixed-corner" :style="{left: innerOffsetX + 'px', top: innerOffsetY + 'px', width: leftHeaderWidth + 'px', height: topHeaderHeight + 'px'}">    {{innerOffsetY}}
</div>

    <div class="fixed-row" :style="{top: innerOffsetY + 'px'}">
      <div class="fixed-row-cell" v-for="(intervention, i) in interventions" :style="{left: leftHeaderWidth + i * 100 + 'px', height: topHeaderHeight + 'px'}">{{intervention.Intervention}}</div>
    </div>

    <div class="fixed-col" :style="{left: innerOffsetX + 'px'}">
      <div class="fixed-col-cell" v-for="(outcome, i) in outcomes" :style="{top: (topHeaderHeight + i * 100) + 'px', width: leftHeaderWidth + 'px'}">{{outcome.Outcome}}</div>
    </div>

    <div class="grid-wrapper">
      <div class="grid-inner" :style="{left: (leftHeaderWidth) + 'px', top: (topHeaderHeight) + 'px'}">
        <svg v-bind:width="numCols * cellSize" v-bind:height="numRows * cellSize"  v-if="outcomeGroups.length > 0">
          <g>
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
      topHeaderHeight: 150,
      leftHeaderWidth: 200,
      innerOffsetX: 0,
      innerOffsetY: 0,
      cellSize: 100
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
    let self = this
    window.addEventListener('scroll', function() {
      console.log('scroll')
      self.innerOffsetX = window.scrollX
      self.innerOffsetY = window.scrollY
    })
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


.fixed-corner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: white;
  z-index: 150;
  border: 1px solid #ddd;
}

.fixed-row {
  position: relative;
}

.fixed-row .fixed-row-cell {
  position: absolute;
  height: 100px;
  width: 100px;
  text-align: center;
  border: 1px solid #ddd;
  background-color: white;
  z-index: 100;

}

.fixed-col {
  position: relative;
}

.fixed-col-cell {
  position: absolute;
  height: 100px;
  width: 100px;
  text-align: center;
  border: 1px solid #ddd;
  background-color: white;
  z-index: 100;
}

.grid-wrapper {
  position: relative;
}

.grid-inner {
  position: absolute;
  /* left: 100px; */
  /* top: 100px; */
}

/* .fixed-corner {
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
  height: 100px;
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
} */

</style>
