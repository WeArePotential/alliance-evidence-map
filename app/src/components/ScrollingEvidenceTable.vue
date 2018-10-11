<template>

  <div class="scrollable-table" :style="{marginLeft: sidebarWidth + 'px'}">
    <div class="fixed-corner" :style="{left: sidebarWidth + 'px', width: leftHeaderWidth + 'px', height: topHeaderHeight + 'px'}"></div>

    <div class="fixed-row" :style="{left: sidebarWidth + 'px'}">
      <div class="headers">
        <div class="header-container" v-for="header in interventionHeaders" :style="{left: (-innerOffsetX + header.x) + 'px'}">
          <svg :height="categoryWidth" :width="header.size - 3">
            <text :transform="`translate(${0.5 * header.size}, 18)`">{{header.name}}</text>
          </svg>
        </div>
      </div>
      <div class="interventions">
        <div class="fixed-row-cell" v-for="(intervention, i) in interventions" :style="{left: (-innerOffsetX + leftHeaderWidth + i * cellWidth) + 'px', top: categoryWidth + 'px', width: cellWidth + 'px', height: (topHeaderHeight - categoryWidth) + 'px'}">
          <div class="b">{{intervention}}</div>
        </div>
      </div>
    </div>

    <div class="fixed-col" :style="{left: sidebarWidth + 'px'}">
      <div class="headers">
        <div class="header-container" v-for="header in outcomeHeaders" :style="{top: (-innerOffsetY + header.y) + 'px'}">
          <svg :width="categoryWidth" :height="header.size - 3">
            <text :transform="`rotate(-90)translate(${-0.5 * header.size}, 18)`">{{header.name}}</text>
          </svg>
        </div>
      </div>
      <div class="outcomes">
        <div class="fixed-col-cell" v-for="(outcome, i) in outcomes" :style="{top: (-innerOffsetY + topHeaderHeight + i * cellHeight) + 'px', left: categoryWidth + 'px', width: (leftHeaderWidth - categoryWidth) + 'px', height: cellHeight + 'px'}">
          <div class="b">{{outcome}}</div>
        </div>
      </div>
    </div>


     <div class="grid-wrapper">
      <div class="grid-inner" :style="{left: (leftHeaderWidth) + 'px', top: (topHeaderHeight) + 'px'}">
        <svg v-bind:width="numCols * cellWidth" v-bind:height="numRows * cellHeight"  v-if="outcomeGroups.length > 0">
          <g class="cells">
            <g v-for="(outcome, i) in outcomes" v-bind:transform="`translate(0, ${i * cellHeight})`">
              <g v-for="(intervention, j) in interventions" v-bind:transform="`translate(${j * cellWidth}, 0)`" v-on:click="action('selectCell', {outcome: outcome, intervention: intervention})">
                <Barchart :data="outcomeInterventionLU[outcome][intervention]" :width="cellWidth" :height="cellHeight" :maxStudies="maxStudies" />
              </g>
            </g>
          </g>

          <g class="grid-lines">
            <g v-for="(outcome, i) in outcomes" v-bind:transform="`translate(0, ${i * cellHeight})`">
              <line class="grid-line" :x2="numCols * cellWidth" />
            </g>
            <g v-for="(intervention, i) in interventions" v-bind:transform="`translate(${i * cellWidth})`">
              <line class="grid-line" :y2="numRows * cellHeight" />
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
    interventionGroups: Array,
    outcomeGroups: Array,
    outcomeInterventionLU: Object,
    action: Function,
    sidebarWidth: Number,
    maxStudies: Number
  },
  data: function() {
    return {
      topHeaderHeight: 200,
      leftHeaderWidth: 240,
      categoryWidth: 28,
      innerOffsetX: 0,
      innerOffsetY: 0,
      cellWidth: 100,
      cellHeight: 60
    }
  },
  computed: {
    numRows: function() {
      return this.outcomes ? this.outcomes.length : 0
    },
    numCols: function() {
      return this.interventions.length
    },
    outcomeHeaders: function() {
      let y = this.topHeaderHeight
      let headers = []
      this.outcomeGroups.forEach(g => {
        let h = g.size * this.cellHeight
        headers.push({
          name: g.name.toUpperCase(),
          size: h,
          y: y
        })
        y += h
      })
      return headers
    },
    interventionHeaders: function() {
      let x = this.leftHeaderWidth
      let headers = []
      this.interventionGroups.forEach(g => {
        let w = g.size * this.cellWidth
        headers.push({
          name: g.name.toUpperCase(),
          size: w,
          x: x
        })
        x += w
      })
      return headers
    }
  },
  mounted: function() {
    let self = this
    window.addEventListener('scroll', function() {
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
  border-right: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
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
  /* height: 100px; */
  /* width: 100px; */
  text-align: center;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #aaa;
  background-color: white;

  display: flex;
  align-items: flex-end;
  padding: 0 5px 10px 5px;

  box-sizing: border-box;
}

.fixed-col {
  position: fixed;
  z-index: 100;
}

.fixed-col-cell {
  position: absolute;
  height: 100px;
  width: 100px;
  text-align: center;
  border-right: 1px solid #aaa;
  border-bottom: 1px solid #eee;
  background-color: white;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-container {
  position: absolute;
}

.header-container svg {
  background-color: #a71930;
  /* border-bottom: 12px solid white; */
}

.header-container svg text {
  font-weight: bold;
  fill: white;
  text-anchor: middle;
}

.grid-wrapper {
  position: relative;
}

.grid-inner {
  position: absolute;
  /* left: 100px; */
  /* top: 100px; */
}

.grid-line {
  stroke: #eee;
  shape-rendering: crispEdges;
}

</style>
