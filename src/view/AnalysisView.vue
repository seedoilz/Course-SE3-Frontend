<template>
  <div class="bg">
    <!-- banner start -->
    <div class="caption-title">
      <i class="fl"><img src="../assets/images/title-left.png" alt=""></i>
      <span class="biaoti fl">SentiStrength</span>
      <i class="fr"><img src="../assets/images/title-right.png" alt=""></i>
    </div>
    <!-- 内容正文 -->
    <div class="zhenwen">
      <div class="left_zs fl">
        <!-- 项目概览 -->
        <div class="data-box1 left_tb fl">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="data-title">
            <b class="data-title-left fl">[</b>
            <span>项目名称</span>
            <b class="data-title-right fr">]</b>
          </div>
          <!-- 项目概览-->
          <div class="xmglan">
            <div id="xmgl_cen">
              <div class="xmgl_tb">
                <span>Apache Superset</span>
              </div>
              <div class="xmgl_tb none">

              </div>
            </div>
          </div>
        </div>
        <!-- 项目人员信息状态 -->
        <div class="data-box1 left_tb fl mtop40">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="data-title">
            <b class="data-title-left fl">[</b>
            <span>情绪占比图</span>
            <b class="data-title-right fr">]</b>
          </div>
          <!-- 项目人员信息状态-->
          <div class="ryclts" style="height: 1038px">
            <div id="xjfxzt" style="height:100%">
              <MultipleXAxes v-bind:x2="['v1.1', 'v1.2', 'v1.3', 'v1.4', 'v1.1', 'v1.2', 'v1.3', 'v1.4', 'v1.1', 'v1.2']"
                             v-bind:x1="['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']"
                             v-bind:positive="[0.120, 0.132, 0.101, 0.134, 0.90, 0.230, 0.210, 0.1, 0.2, 0.3]"
                             v-bind:negative="[0.220, 0.182, 0.191, 0.234, 0.290, 0.330, 0.310, 0.1, 0.2, 0.3]"
                             txt="折线图中两条折线，分别积极情绪和消极情绪的占比，y轴为占比比例，x1轴为评论的时间,x2轴为版本"
                             head="表1">
              </MultipleXAxes>
            </div>
          </div>
        </div>

      </div>

      <!--仪表盘等展示-->
      <div class="center_zs fl">
        <div class="data-box1 box1-back" style="height: 1175px">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="data-title">
            <b class="data-title-left">[</b>
            <span>词云图</span>
            <b class="data-title-right">]</b>
          </div>

        </div>
      </div>
      <!--右侧图表展示 -->
      <div class="right_zs fl">
        <!-- 巡检风险状态 -->
        <div class="data-box1 right_tb ">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="data-title">
            <b class="data-title-left">[</b>
            <span>用户情绪图</span>
            <b class="data-title-right">]</b>
          </div>
          <!--巡检风险状态-->
          <div class="ryclts">
            <div id="xjfxzt" style="height:100%">
                  <MultipleXAxes v-bind:x2="['v1.1', 'v1.2', 'v1.3', 'v1.4', 'v1.1', 'v1.2', 'v1.3', 'v1.4', 'v1.1', 'v1.2']"
                                 v-bind:x1="['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']"
                                 v-bind:positive="[1, 2, 1, 3, 0, 2, 1, 1, 3, 0]"
                                 v-bind:negative="[2, 1, 1, 4, 2, 3, 0, 1, 3, 0]"
                                 txt="输入用户名，x1轴为用户评论时间，x2轴为版本，y轴为情绪值"
                                 head="表2">
                  </MultipleXAxes>
            </div>
          </div>
        </div>

        <!-- 风险变化趋势 -->
        <div class="data-box1 right_tb mtop40">
          <i class="topL"></i>
          <i class="topR"></i>
          <i class="bottomL"></i>
          <i class="bottomR"></i>
          <div class="data-title">
            <b class="data-title-left">[</b>
            <span>情绪数量图</span>
            <b class="data-title-right">]</b>
          </div>
          <div class="ryclts">
            <div id="xjfxzt" style="height:100%">
                  <BasicBar txt="x轴为不同版本，y轴为积极情绪和消极情绪的数量"
                            head="表3"
                            v-bind:positive="[23, 25, 43, 13, 25, 14]"
                            v-bind:negative="[17, 12, 14, 15, 35, 24]"
                            v-bind:x="['v1.1', 'v1.2', 'v1.3', 'v1.4', 'v1.5', 'v1.6']">
                  </BasicBar>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="h30 clearfix"></div>
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

<style scoped>
@import "../assets/css/public.css";
@import "../assets/css/jianlisw.css";
@import "../assets/css/jianlixt.css";

* {
  padding:0;
  margin:0;
  font-family:"微软雅黑";
  font-size:12px;
  font-style:normal
}
dd,dl,dt,em,i,p,textarea,a,div {
  padding:0;
  margin:0;
}
a {
  text-decoration:none;
}
img {
  border:0;
}
ul,li {
  padding:0;
  margin:0;
  list-style:none;
}
.bg {
  margin:0;
  padding:0;
  color:#000;
  background:#000c3b;
}

</style>
