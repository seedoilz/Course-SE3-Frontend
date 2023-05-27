<template>
  <div>
    <h1>表1</h1>
    <div id="proportionChart" class="chart"></div>
    <p>{{this.txt}}}</p>
    <el-button @click="showMultipleXAxesChart" type="primary" plain>刷新</el-button>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Multiple-X-Axes',
  props: {
    x1: Array,
    x2: Array,
    positive: Array,
    negative: Array,
    txt: String
  },
  mounted () {
    this.showMultipleXAxesChart()
  },
  methods: {
    showMultipleXAxesChart () {
      let chartDom = document.getElementById('proportionChart')
      let myChart = echarts.init(chartDom)
      let option
      const colors = ['#5470C6', '#EE6666']

      option = {
        color: colors,
        title: {
        },
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
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    'Precipitation  ' +
                    params.value +
                    (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  )
                }
              }
            },
            // prettier-ignore
            // TODO 填写x1单位
            data: this.x1
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    'Precipitation  ' +
                    params.value +
                    (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  )
                }
              }
            },
            // prettier-ignore
            // TODO 填写x2轴单位
            data: this.x2
          }
        ],
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'positive',
            type: 'line',
            stack: 'Total',
            data: this.positive
          },
          {
            name: 'negative',
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
</style>
