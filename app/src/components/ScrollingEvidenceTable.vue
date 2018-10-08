<template>

  <div class="scrollable-table" :style="{marginLeft: sidebarWidth + 'px'}">
    <div class="fixed-corner" :style="{left: sidebarWidth + 'px', width: leftHeaderWidth + 'px', height: topHeaderHeight + 'px'}"></div>

    <div class="fixed-row" :style="{left: sidebarWidth + 'px'}">
      <div class="fixed-row-cell" v-for="(intervention, i) in interventions" :style="{left: (-innerOffsetX + leftHeaderWidth + i * 100) + 'px', height: topHeaderHeight + 'px'}">
        <div class="b">{{intervention.Intervention}}</div>
      </div>
    </div>

    <div class="fixed-col" :style="{left: sidebarWidth + 'px'}">
      <div class="fixed-col-cell" v-for="(outcome, i) in outcomes" :style="{top: (-innerOffsetY + topHeaderHeight + i * 100) + 'px', width: leftHeaderWidth + 'px'}">
        <div class="b">{{outcome.Outcome}}</div>
      </div>
    </div>

    <div class="grid-wrapper">
      <div class="grid-inner" :style="{left: (leftHeaderWidth) + 'px', top: (topHeaderHeight) + 'px'}">
        <svg v-bind:width="numCols * cellSize" v-bind:height="numRows * cellSize"  v-if="outcomeGroups.length > 0">
          <g>
            <g v-for="(outcome, i) in outcomeGroups[0].outcomes" v-bind:transform="`translate(0, ${i * 100})`">
              <g v-for="(d, i) in outcome.interventions" v-bind:transform="`translate(${i * 100}, 0)`" v-on:click="action('selectCell', {outcome: outcome.outcome, intervention: d.intervention})">
                <Barchart :data="d.data" :size="cellSize" :maxStudies="maxStudies" />
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

import Barchart from './Barchart.vue'

export default {
  name: 'ScrollingEvidenceTable',
  components: {
    Barchart
  },
  props: {
    outcomes: Array,
    interventions: Array,
    outcomeGroups: Array,
    action: Function,
    sidebarWidth: Number,
    maxStudies: Number
  },
  data: function() {
    return {
      topHeaderHeight: 180,
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
  position: relative;
  font-size: 12px;
}


.fixed-corner {
  position: fixed;
  top: 0;
  width: 100px;
  height: 100px;
  background-color: white;
  z-index: 150;
  /* border: 1px solid #ddd; */
}

.fixed-row {
  /* position: relative; */

  position: fixed;
  top: 0;
  z-index: 100;
}

.fixed-row .fixed-row-cell {
  position: absolute;
  height: 100px;
  width: 100px;
  text-align: center;
  /* border: 1px solid #ddd; */
  background-color: white;

  display: flex;
  align-items: flex-end;
  padding: 0 5px 10px 5px;

  box-sizing: border-box;
}

.fixed-col {
  /* position: relative; */

  position: fixed;
  z-index: 100;
  /* top: 150px; */
}

.fixed-col-cell {
  position: absolute;
  height: 100px;
  width: 100px;
  text-align: center;
  /* border: 1px solid #ddd; */
  background-color: white;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
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
