<template>
  <g>
    <rect class="background" :width="width" :height="height" :style="{fill: selected ? '#ddd' : null}"/>
    <g v-if="nonZero" class="cell">
      <g :transform="`translate(0, ${0.5 * height})`">
        <rect v-for="bar in positiveBars" :x="bar.x" :width="bar.width" :y="bar.y" :height="bar.height" :style="{fill: '#23844e', opacity: bar.opacity}"/>
        <line x1="10" :x2="width - 10" />
        <rect v-for="bar in negativeBars" :x="bar.x" :width="bar.width" :y="bar.y" :height="bar.height" :style="{fill: '#e52e78', opacity: bar.opacity}"/>
      </g>
    </g>
  </g>
</template>


<script>
import {scaleLinear, scaleBand} from 'd3-scale'

export default {
  name: 'Barchart',
  props: {
    data: Object,
    width: Number,
    height: Number,
    maxStudies: Number,
    selected: Boolean
  },
  computed: {
    nonZero: function() {
      return this.data.for.low.length + this.data.for.moderate.length + this.data.for.high.length + this.data.against.low.length + this.data.against.moderate.length + this.data.against.high.length > 0
    },
    positiveBars: function() {
      let yScale = scaleLinear().domain([0, this.maxStudies]).range([0, 0.4 * this.height])
      let xScale = scaleBand().domain([0, 1, 2]).range([0, this.width]).paddingInner(0.05).paddingOuter(0.5)

      return [
        {x: xScale(0), width: xScale.bandwidth(), y: -yScale(this.data.for.low.length), height: yScale(this.data.for.low.length), opacity: 0.3},
        {x: xScale(1), width: xScale.bandwidth(), y: -yScale(this.data.for.moderate.length), height: yScale(this.data.for.moderate.length), opacity: 0.6},
        {x: xScale(2), width: xScale.bandwidth(), y: -yScale(this.data.for.high.length), height: yScale(this.data.for.high.length), opacity: 1}
      ]
    },
    negativeBars: function() {
      let yScale = scaleLinear().domain([0, this.maxStudies]).range([0, 0.4 * this.height])
      let xScale = scaleBand().domain([0, 1, 2]).range([0, this.width]).paddingInner(0.05).paddingOuter(0.5)

      return [
        {x: xScale(0), width: xScale.bandwidth(), y: 0, height: yScale(this.data.against.low.length), opacity: 0.3},
        {x: xScale(1), width: xScale.bandwidth(), y: 0, height: yScale(this.data.against.moderate.length), opacity: 0.6},
        {x: xScale(2), width: xScale.bandwidth(), y: 0, height: yScale(this.data.against.high.length), opacity: 1}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
g {
  cursor: pointer;
}
rect.background {
  fill: white;
}
g.cell:hover rect {
  fill: #eee;
}
line {
  stroke: #ddd;
  shape-rendering: crispEdges;
}
</style>
