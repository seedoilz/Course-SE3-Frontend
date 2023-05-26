<template>
  <div>
    <div id="proportionChart" class="chart"></div>
    <div>
      <h1>表1</h1>
      <p>折线图中两条折线，分别积极情绪和消极情绪的占比，y轴为占比比例，x1轴为评论的时间,x2轴为版本</p>
      <el-button @click="showProportionChart" type="primary" plain>刷新</el-button>
    </div>

    <div id="countChart" class="chart"></div>
    <div>
      <h1>表2</h1>
      <p>x轴为不同版本，y轴为积极情绪和消极情绪的数量</p>
    </div>

    <div id="userChart" class="chart"></div>
    <div>
      <h1>表3</h1>
      <p>输入用户名，x1轴为用户评论时间，x2轴为版本，y轴为情绪词数量</p>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'AnalysisView',
  data () {
    return {

    }
  },
  mounted () {
    this.showProportionChart()
  },
  methods: {
    showProportionChart () {
      let chartDom = document.getElementById('proportionChart')
      let myChart = echarts.init(chartDom)
      let option

      option = {
        title: {
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads']
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
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
