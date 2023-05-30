<template>
  <div class="BasicBar">
    <h1>{{this.head}}</h1>
    <p>{{this.txt}}</p>
    <div :id="head" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BasicBar',
  props: {
    x: Array,
    positive: Array,
    negative: Array,
    neutral: Array,
    txt: String,
    head: String
  },
  mounted () {
    this.showCountChart()
  },
  methods: {
    showCountChart () {
      let chartDom = document.getElementById(this.head)
      let myChart = echarts.init(chartDom)
      let option

      option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['positive', 'negative', 'neutral']
        },
        xAxis: {
          data: this.x
        },
        yAxis: {},
        series: [{
          name: 'positive',
          type: 'bar',
          data: this.positive
        }, {
          name: 'negative',
          type: 'bar',
          data: this.negative
        }, {
          name: 'neutral',
          type: 'bar',
          data: this.neutral
        }]
      }

      option && myChart.setOption(option)
    }
  }
}
</script>

<style>
.chart {
  width: 80%;
  height:400px;
}
p, h1 {
  color: black;
}
.BasicBar {
  text-align: center;
  width: 100%;
}
</style>
