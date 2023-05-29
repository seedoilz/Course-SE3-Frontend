<template>
  <div class="MultipleXAxes">
    <h1>{{this.head}}</h1>
    <div :id="head" class="chart"></div>
    <p>{{this.txt}}</p>
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

      const colors = ['#5470C6', '#EE6666']
      option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['positive', 'negative']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
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
            stack: 'Total',
            data: this.positive
          },
          {
            name: 'negative',
            textStyle: {
              color: colors[1]
            },
            type: 'line',
            stack: 'Total',
            data: this.negative
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
  color: white;
}
.button {

}
</style>
