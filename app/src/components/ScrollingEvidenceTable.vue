<template>

  <div class="scrollable-table" :style="{marginLeft: sidebarWidth + 'px'}">
    <div class="fixed-corner" :style="{left: sidebarWidth + 'px', width: leftHeaderWidth + 'px', height: topHeaderHeight + 'px'}">
      <svg :width="leftHeaderWidth" :height="topHeaderHeight">
        <g transform="translate(5, 160)">
          <g transform="translate(0, 0)">
            <rect x="12.658227848101262" width="24.050632911392405" y="-10" height="10" style="fill: #23844e; opacity: 0.3;"></rect>
            <rect x="37.974683544303794" width="24.050632911392405" y="-27.428571428571427" height="27.428571428571427" style="fill: #23844e; opacity: 0.6;"></rect>
            <rect x="63.291139240506325" width="24.050632911392405" y="-4.571428571428571" height="4.571428571428571" style="fill: #23844e; opacity: 1;"></rect>
            <line x1="10" x2="90"></line>
            <rect x="12.658227848101262" width="24.050632911392405" y="0" height="14.571428571428571" style="fill: #e52e78; opacity: 0.3;"></rect>
            <rect x="37.974683544303794" width="24.050632911392405" y="0" height="19.142857142857142" style="fill: #e52e78; opacity: 0.6;"></rect>
            <rect x="63.291139240506325" width="24.050632911392405" y="0" height="8" style="fill: #e52e78; opacity: 1;"></rect></g>

            <g fill="#23844e" transform="translate(0, -18)">
              <text x="95" >Evidence supporting</text>
              <text x="95" y="13">the intervention</text>
            </g>
            <g fill="#e52e78" transform="translate(0, 15)">
              <text x="95">Evidence not supporting</text>
              <text x="95" y="13">the intervention</text>
            </g>

            <g transform="translate(28,-40)">
              <text transform="rotate(-90)" style="opacity: 0.4;">Low quality evidence</text>
            </g>
            <g transform="translate(54,-40)">
              <text transform="rotate(-90)" style="opacity: 0.7">Moderate quality</text>
            </g>
            <g transform="translate(80,-40)">
              <text transform="rotate(-90)">High quality evidence</text>
            </g>
        </g>
      </svg>
    </div>

    <div class="fixed-row" :style="{left: sidebarWidth + 'px'}">
      <div class="headers">
        <div class="header-container" v-for="header in interventionHeaders" :style="{left: (-innerOffsetX + header.x) + 'px'}">
          <svg :height="categoryWidth" :width="header.size - 3">
            <text :transform="`translate(${0.5 * header.size}, 18)`">{{header.label}}</text>
            <title>{{header.name}}</title>
          </svg>
        </div>
      </div>
      <div class="interventions">
        <div class="fixed-row-cell" v-for="(intervention, i) in groupedInterventions" :style="{left: (-innerOffsetX + leftHeaderWidth + i * cellWidth) + 'px', top: categoryWidth + 'px', width: cellWidth + 'px', height: (topHeaderHeight - categoryWidth) + 'px', backgroundColor: selectedCell.intervention === intervention ? '#999' : null}">
          <div class="b">{{intervention}}</div>
        </div>
      </div>
    </div>

    <div class="fixed-col" :style="{left: sidebarWidth + 'px'}">
      <div class="headers">
        <div class="header-container" v-for="header in outcomeHeaders" :style="{top: (-innerOffsetY + header.y) + 'px'}">
          <svg :width="categoryWidth" :height="header.size - 3">
            <text :transform="`rotate(-90)translate(${-0.5 * header.size}, 18)`">{{header.name}}</text>
            <title>{{header.name}}</title>
          </svg>
        </div>
      </div>
      <div class="outcomes">
        <div class="fixed-col-cell" v-for="(outcome, i) in groupedOutcomes" :style="{top: (-innerOffsetY + topHeaderHeight + i * cellHeight) + 'px', left: categoryWidth + 'px', width: (leftHeaderWidth - categoryWidth) + 'px', height: cellHeight + 'px', backgroundColor: selectedCell.outcome === outcome ? '#ddd' : null}">
          <div class="b">{{outcome}}</div>
        </div>
      </div>
    </div>


     <div class="grid-wrapper">
      <div class="grid-inner" :style="{left: (leftHeaderWidth) + 'px', top: (topHeaderHeight) + 'px'}">
        <svg v-bind:width="numCols * cellWidth" v-bind:height="numRows * cellHeight"  v-if="outcomeGroups.length > 0" @click="action('selectCell', {outcome: null, intervention: null})">
          <g class="cells">
            <g v-for="(outcome, i) in groupedOutcomes" v-bind:transform="`translate(0, ${i * cellHeight})`">
              <g v-for="(intervention, j) in groupedInterventions" v-bind:transform="`translate(${j * cellWidth}, 0)`" @click.stop="action('selectCell', {outcome: outcome, intervention: intervention})">
                <Barchart :data="outcomeInterventionLU[outcome][intervention]" :width="cellWidth" :height="cellHeight" :maxStudies="maxStudies" :selected="selectedCell.outcome === outcome && selectedCell.intervention === intervention"/>
              </g>
            </g>
          </g>

          <g class="grid-lines">
            <g v-for="(outcome, i) in groupedOutcomes" v-bind:transform="`translate(0, ${i * cellHeight})`">
              <line class="grid-line" :x2="numCols * cellWidth" />
            </g>
            <g v-for="(intervention, i) in groupedInterventions" v-bind:transform="`translate(${i * cellWidth})`">
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
    maxStudies: Number,
    selectedCell: Object
  },
  data: function() {
    return {
      topHeaderHeight: 200,
      leftHeaderWidth: 240,
      categoryWidth: 28,
      innerOffsetX: 0,
      innerOffsetY: 0,
      cellWidth: 100,
      cellHeight: 80
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
    groupedOutcomes: function() {
      let outcomes = []
      this.outcomeGroups.forEach(g => {
        outcomes = outcomes.concat(g.items)
      })
      return outcomes
    },
    interventionHeaders: function() {
      let x = this.leftHeaderWidth
      let headers = []
      this.interventionGroups.forEach(g => {
        let w = g.size * this.cellWidth
        let name = g.name.toUpperCase()
        let label = name
        let maxChars = w / 11
        if(name.length > maxChars) {
          label = name.slice(0, maxChars) + '...'
        }
        headers.push({
          name: name,
          label: label,
          size: w,
          x: x
        })
        x += w
      })
      return headers
    },
    groupedInterventions: function() {
      let interventions = []
      this.interventionGroups.forEach(g => {
        interventions = interventions.concat(g.items)
      })
      return interventions
    },
  },
  mounted: function() {
    let self = this
    window.addEventListener('scroll', function() {
      self.innerOffsetX = window.pageXOffset
      self.innerOffsetY = window.pageYOffset
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

.fixed-corner line {
  stroke: #ddd;
  shape-rendering: crispEdges;
}

.fixed-corner text {
  font-size: 12px;
  /* fill: #555; */
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
  background-color: #36b0e3;
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
