<template>
  <div class="BasicBar">
<!--    <h1>{{this.head}}</h1>-->
    <div :id="head" class="chart"></div>
    <p>{{this.txt}}</p>
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
      const colors = ['#5470C6', '#EE6666', '#0a8f53']

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.x,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'positive',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                // 设置坐标轴颜色
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'negative',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                // 设置坐标轴颜色
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'neutral',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                // 设置坐标轴颜色
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: 'positive',
            type: 'bar',
            data: this.positive
          },
          {
            name: 'negative',
            type: 'bar',
            yAxisIndex: 1,
            data: this.negative
          },
          {
            name: 'neutral',
            type: 'bar',
            yAxisIndex: 2,
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
p, h1 {
  color: white;
}
.BasicBar {
  text-align: center;
}
.button {

}
</style>
