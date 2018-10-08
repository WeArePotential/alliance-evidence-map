<template>
  <div id="app">
    <div class="app-wrapper">
      <div class="sidebar">
        Sidebar
      </div>
      <div class="scrollable-table">
        <div class="fixed-corner"></div>
        <div class="fixed-row" v-bind:style="{left: x + 'px'}">
          <div class="fixed-row-cell"></div>
          <div class="fixed-row-cell" v-for="(cell, i) in values[0]" v-bind:style="{left: (i + 1) * 100 + 'px'}">{{i}}</div>
        </div>
        <div class="fixed-col" v-bind:style="{top: y + 'px'}">
          <div class="fixed-row-cell" v-for="(cell, i) in values" v-bind:style="{top: (i + 1) * 100 + 'px'}">{{i}}</div>
        </div>
        <div class="grid-wrapper">
          <div class="grid-inner">
            <svg v-bind:width="numCols * cellSize" v-bind:height="numRows * cellSize">
              <g v-bind:transform="'translate(' + x + ',' + y + ')'">
                <g v-for="(row, i) in values" v-bind:transform="`translate(0, ${i * 100 + 50})`">
                  <circle v-for="(d, i) in row" v-bind:r="d" v-bind:cx="i * 100 + 50" cy="0" v-on:click="handleCellClick()" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {drag as d3_drag} from 'd3-drag'
import {select as d3_select, event as d3_event} from 'd3-selection'


export default {
  name: 'scroll-test-app',
  components: {
    // EvidenceTable
  },
  data: function() {
    return {
      numRows: 5,
      numCols: 15,
      cellSize: 100,
      x: 0,
      y: 0,
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
    values: function() {
      let values = []
      for(let i = 0; i < this.numRows; i++) {
        let row = []
        for(let j = 0; j < this.numCols; j++) {
          row.push(Math.floor(Math.random() * 50))
        }
        values.push(row)
      }
      return values
    }
  },
  methods: {
    handleCellClick: function() {
      console.log('click')
    }
  },
  mounted: function() {
    console.log('mounted')
    d3_select('.grid-inner')
      .call(this.drag)
  }
}
</script>

<style>
body {
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

.app-wrapper {
  /* display: flex; */
}

.sidebar {
  position: fixed;
  width: 200px;
  z-index: 200;
  top: 0;
  bottom: 0;
  background-color: #fff;
}

.scrollable-table {
  margin-left: 200px;
  position: relative;
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
  line-height: 100px;
}

.fixed-col {
  width: 100px;
  z-index: 100;
  background-color: #fff;
  position: relative;
}

.fixed-col-cell {
  width: 100px;
  text-align: center;
  line-height: 100px;
}

.grid-wrapper {
  width: 2000px;
  height: 1000px;
  background-color: #eee;
  position: absolute;
  top: 100px;
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
