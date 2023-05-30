<template>
  <div class="MultipleXAxes">
    <h1>{{this.head}}</h1>
    <p>{{this.txt}}</p>
    <div :id="head" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Multiple-X-Axes',
  props: {
    x1: Array,
    positive: Array,
    negative: Array,
    neutral: Array,
    txt: String,
    head: String
  },
  mounted () {
    this.showMultipleXAxesChart()
  },
  methods: {
    showMultipleXAxesChart () {
      let chartDom = document.getElementById(this.head)
      let myChart = echarts.init(chartDom)
      let option
      console.log(this.head, ': ', this.x1)

      const colors = ['#5470C6', '#EE6666', '#0a8f53']
      option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['positive', 'negative', 'neutral']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.x1
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'positive',
            textStyle: {
              color: colors[0]
            },
            type: 'line',
            data: this.positive
          },
          {
            name: 'negative',
            textStyle: {
              color: colors[1]
            },
            type: 'line',
            data: this.negative
          },
          {
            name: 'neutral',
            textStyle: {
              color: colors[2]
            },
            type: 'line',
            data: this.neutral
          }
        ]
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
.MultipleXAxes {
  height: 80%;
}
p, h1 {
  color: black;
}
</style>
