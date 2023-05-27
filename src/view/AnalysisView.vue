<template>
  <div>
    <MultipleXAxes v-bind:x2="['v1.1', 'v1.2', 'v1.3', 'v1.4', 'v1.1', 'v1.2', 'v1.3', 'v1.4', 'v1.1', 'v1.2']"
                   v-bind:x1="['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']"
                   v-bind:positive="[0.120, 0.132, 0.101, 0.134, 0.90, 0.230, 0.210, 0.1, 0.2, 0.3]"
                   v-bind:negative="[0.220, 0.182, 0.191, 0.234, 0.290, 0.330, 0.310, 0.1, 0.2, 0.3]"
                   txt="折线图中两条折线，分别积极情绪和消极情绪的占比，y轴为占比比例，x1轴为评论的时间,x2轴为版本"
                   head="表1">
    </MultipleXAxes>

    <MultipleXAxes v-bind:x2="['v1.1', 'v1.2', 'v1.3', 'v1.4', 'v1.1', 'v1.2', 'v1.3', 'v1.4', 'v1.1', 'v1.2']"
                   v-bind:x1="['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']"
                   v-bind:positive="[1, 2, 1, 3, 0, 2, 1, 1, 3, 0]"
                   v-bind:negative="[2, 1, 1, 4, 2, 3, 0, 1, 3, 0]"
                   txt="输入用户名，x1轴为用户评论时间，x2轴为版本，y轴为情绪值"
                   head="表2">
    </MultipleXAxes>

    <BasicBar txt="x轴为不同版本，y轴为积极情绪和消极情绪的数量"
              head="表3"
              v-bind:positive="[23, 25, 43, 13, 25, 14]"
              v-bind:negative="[17, 12, 14, 15, 35, 24]"
              v-bind:x="['v1.1', 'v1.2', 'v1.3', 'v1.4', 'v1.5', 'v1.6']">
    </BasicBar>

  </div>
</template>

<script>
import axios from 'axios'
import MultipleXAxes from '@/view/ChartView/Multiple-X-Axes.vue'
import BasicBar from '@/view/ChartView/BasicBar.vue'

export default {
  name: 'AnalysisView',
  components: {BasicBar, MultipleXAxes},
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    showCountChart1 () {
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
    }
  }
}
</script>

<style>
el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

el-col {
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
