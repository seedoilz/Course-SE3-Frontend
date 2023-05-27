<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content bg-purple">
        <MultipleXAxes v-bind:x1="['v1.1', 'v1.2', 'v1.3', 'v1.4']"
                       v-bind:x2="['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']"
                       v-bind:positive-proportion="[0.120, 0.132, 0.101, 0.134, 0.90, 0.230, 0.210]"
                       v-bind:negative-proportion="[0.220, 0.182, 0.191, 0.234, 0.290, 0.330, 0.310]">
        </MultipleXAxes>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

<!--    <div>-->
<!--      <h1>表2</h1>-->
<!--      <div id="countChart" class="chart"></div>-->
<!--      <p>x轴为不同版本，y轴为积极情绪和消极情绪的数量</p>-->
<!--      <el-button @click="showCountChart" type="primary" plain>刷新</el-button>-->
<!--    </div>-->

<!--    <div>-->
<!--      <h1>表3</h1>-->
<!--      <div id="userChart" class="chart"></div>-->
<!--      <p>输入用户名，x1轴为用户评论时间，x2轴为版本，y轴为情绪值</p>-->
<!--      <el-button @click="showUserChart" type="primary" plain>刷新</el-button>-->
<!--    </div>-->

  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import MultipleXAxes from '@/view/ChartView/Multiple-X-Axes.vue'
export default {
  name: 'AnalysisView',
  components: {MultipleXAxes},
  data () {
    return {
    }
  },
  mounted () {
    // this.showProportionChart()
    this.showCountChart()
    this.showUserChart()
  },
  methods: {
    showProportionChart () {
      let fd = new FormData()
      fd.append('file', this.file)
      axios.post('http://124.70.198.102:3456/data/list', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (response.status === 200) {
          console.log('success')

        } else {
          console.log(response)
        }
      })

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
            data: ['v1.1', 'v1.2', 'v1.3', 'v1.4']
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
            data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
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
            data: [0.120, 0.132, 0.101, 0.134, 0.90, 0.230, 0.210]
          },
          {
            name: 'negative',
            type: 'line',
            stack: 'Total',
            data: [0.220, 0.182, 0.191, 0.234, 0.290, 0.330, 0.310]
          }
        ]
      }
      option && myChart.setOption(option)
    },

    showCountChart () {
      let fd = new FormData()
      fd.append('file', this.file)
      axios.post('http://124.70.198.102:3456/data/list', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (response.status === 200) {
          console.log('success')
        } else {
          console.log(response)
        }
      })

      let chartDom = document.getElementById('countChart')
      let myChart = echarts.init(chartDom)
      let option

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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }

      option && myChart.setOption(option)
    },

    showUserChart () {
      let fd = new FormData()
      fd.append('file', this.file)
      axios.post('http://124.70.198.102:3456/data/list', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (response.status === 200) {
          console.log('success')
        } else {
          console.log(response)
        }
      })

      let chartDom = document.getElementById('userChart')
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
            data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
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
            data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
          }
        ],
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
