<template>
  <div>
    <h1>表1</h1>
    <div id="proportionChart" class="chart"></div>
    <p>折线图中两条折线，分别积极情绪和消极情绪的占比，y轴为占比比例，x1轴为评论的时间,x2轴为版本</p>
    <el-button @click="showProportionChart" type="primary" plain>刷新</el-button>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  name: 'Multiple-X-Axes',
  props: {
    x1: Array,
    x2: Array,
    positiveProportion: Array,
    negativeProportion: Array
  },
  mounted () {
    this.showProportionChart()
  },
  methods: {
    showProportionChart () {
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
            //TODO 填写x1单位
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
            //TODO 填写x2轴单位
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
            data: this.positiveProportion
          },
          {
            name: 'negative',
            type: 'line',
            stack: 'Total',
            data: this.negativeProportion
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
