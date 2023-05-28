<template>
  <div class="MultipleXAxes">
    <h1>{{this.head}}</h1>
    <div :id="head" class="chart"></div>
    <p>{{this.txt}}</p>
    <el-button @click="showMultipleXAxesChart" type="primary" plain class="button" size="mini">刷新</el-button>
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
        color: colors,
        tooltip: {
          trigger: 'none'
          // 鼠标悬浮时显示
          // axisPointer: {
          //   type: 'cross'
          // }
        },
        legend: {},
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              // 设置坐标轴颜色
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    'negative  ' +
                    params.value +
                    (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  )
                }
              }
            },
            // prettier-ignore
            data: this.x2
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                // 设置坐标轴颜色
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    'positive  ' +
                    params.value +
                    (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  )
                }
              }
            },
            // prettier-ignore
            data: this.x1
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'positive',
            textStyle: {
              color: colors[1]
            },
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            emphasis: {
              focus: 'series'
            },
            data: this.positive
          },
          {
            name: 'negative',
            label: {
              color: colors[1]
            },
            type: 'line',
            smooth: true,
            emphasis: {
              focus: 'series'
            },
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
