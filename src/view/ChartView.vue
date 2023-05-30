<template>
  <div>
    <el-select v-model="chosenCollectionID">
      <el-option v-for="it in collectionList"
                 :label="it.name"
                 :key="it.id"
                 :value="it.id">
      </el-option>
    </el-select>

    <div class="chart-box">
      <div class="block">
        <span>请选择日期</span><br>
        <el-date-picker
          v-model="beginEndData"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          class="date-picker">
        </el-date-picker>
      </div>
      <MultipleXAxes
        v-bind:x1="proportionX"
        v-bind:positive="proportionPositive"
        v-bind:negative="proportionNegative"
        v-bind:neutral="proportionNeutral"
        v-if="proportionNeutral.length > 0"
        txt="折线图中两条折线，分别积极情绪和消极情绪的占比，y轴为占比比例，x1轴为评论的时间"
        head="表1">
      </MultipleXAxes>
      <el-button @click="proportionChart" type="primary" plain class="button">表1</el-button>
    </div>

    <div class="chart-box">
      <el-input v-model="username" placeholder="请输入想要查看的用户名" class="el-input"></el-input>
      <MultipleXAxes
        v-bind:x1="userSentimentX"
        v-bind:positive="userPositiveScore"
        v-bind:negative="userNegativeScore"
        v-bind:neutral="userNeutralScore"
        v-if="userSentimentX.length > 0"
        txt="输入用户名，x1轴为用户评论时间，y轴为情绪值"
        head="表2">
      </MultipleXAxes>
      <br><el-button @click="userChart" type="primary" plain class="button">表2</el-button>
    </div>

    <div class="chart-box">
      <el-input v-model="project" placeholder="请输入想要查看的项目名" class="el-input"></el-input>
      <BasicBar txt="x轴为不同版本，y轴为积极情绪和消极情绪的数量"
                head="表3"
                v-bind:positive="positiveQuantity"
                v-bind:negative="negativeQuantity"
                v-bind:neutral="neutralQuantity"
                v-bind:x="sentimentQuantityX"
                v-if="sentimentQuantityX.length > 0">
      </BasicBar>
      <br><el-button @click="quantityChart" type="primary" plain class="button">表3</el-button>
    </div>
  </div>
</template>

<script>
import MultipleXAxes from '@/view/ChartView/MultipleXAxes-black.vue'
import BasicBar from '@/view/ChartView/BasicBar-black.vue'
import {getSentiByTime, getSentiByUser, getSentiByVersion} from '@/network/main'
import {listAllCollection} from '@/network/management'

export default {
  name: 'ChartView',
  components: {BasicBar, MultipleXAxes},
  data () {
    return {
      collectionList: [],
      chosenCollectionID: '',
      beginEndData: '',
      username: 'villebro',
      project: 'superset',

      proportionX: [],
      proportionPositive: [],
      proportionNegative: [],
      proportionNeutral: [],

      userSentimentX: [],
      userPositiveScore: [],
      userNegativeScore: [],
      userNeutralScore: [],

      sentimentQuantityX: [],
      positiveQuantity: [],
      negativeQuantity: [],
      neutralQuantity: []
    }
  },
  mounted () {
    listAllCollection({
      params: {}
    }).then(res => {
      if (res.code === 200) {
        this.collectionList = res.data.list
      } else {
        this.$message({
          message: res.data.list
        })
      }
    })
  },
  methods: {
    proportionChart () {
      // 显示情绪占比图
      getSentiByTime({
        params: {
          collectionId: this.chosenCollectionID,
          beginDate: this.beginEndData[0],
          endDate: this.beginEndData[1]
        }
      }).then(response => {
        if (response.code === 200) {
          console.log('proportion success: ', response.data)

          let positiveList = []
          let negativeList = []
          let neutralList = []
          let proportionX = []
          for (let i = 0; i < response.data.length; i++) {
            proportionX.push(response.data[i].beginTime)

            let sum = response.data[i].negativeNumber + response.data[i].positiveNumber + response.data[i].neutralNumber

            let proportionPositive = response.data[i].positiveNumber / sum
            let proportionNegative = response.data[i].negativeNumber / sum
            let proportionNeutral = response.data[i].neutralNumber / sum

            positiveList.push(proportionPositive.toFixed(2) * 1)
            negativeList.push(proportionNegative.toFixed(2) * 1)
            neutralList.push(proportionNeutral.toFixed(2) * 1)
          }
          this.proportionX = proportionX
          this.proportionPositive = positiveList
          this.proportionNegative = negativeList
          this.proportionNeutral = neutralList

          // console.log(this.proportionX, this.proportionPositive, this.proportionNegative, this.proportionNeutral)
        } else {
          console.log('proportion fail: ', response)
        }
      })
    },
    userChart () {
      // 显示用户情绪图
      getSentiByUser({
        params: {
          collectionId: this.chosenCollectionID,
          username: this.username
        }
      }).then(res => {
        if (res.code === 200) {
          console.log('username success: ', res.data)

          let userSentimentX = []
          let userPositiveScore = []
          let userNegativeScore = []
          for (let i = 0; i < res.data.length; i++) {
            userSentimentX.push(res.data[i].createdAt)
            userPositiveScore.push(res.data[i].positiveScore)
            userNegativeScore.push(res.data[i].negativeScore)
          }
          this.userSentimentX = userSentimentX
          this.userPositiveScore = userPositiveScore
          this.userNegativeScore = userNegativeScore

          // console.log(this.userSentimentX, this.userPositiveScore, this.userNegativeScore)
        } else {
          console.log('username fail', res)
        }
      })
    },
    quantityChart () {
      // 显示情绪数量图
      getSentiByVersion({
        params: {
          project: this.project
        }
      }).then(res => {
        if (res.code === 200) {
          console.log('project success', res.data)

          let sentimentQuantityX = []
          let positiveQuantity = []
          let negativeQuantity = []
          let neutralQuantity = []
          for (let i = 0; i < res.data.length; i++) {
            sentimentQuantityX.push(res.data[i].version)
            positiveQuantity.push(res.data[i].positiveNumber)
            negativeQuantity.push(res.data[i].negativeNumber)
            neutralQuantity.push(res.data[i].neutralNumber)
          }
          this.sentimentQuantityX = sentimentQuantityX
          this.positiveQuantity = positiveQuantity
          this.negativeQuantity = negativeQuantity
          this.neutralQuantity = neutralQuantity

          // console.log(this.sentimentQuantityX, this.positiveQuantity, this.negativeQuantity, this.neutralQuantity)
        } else {
          console.log('project fail', res)
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
.date-picker {
  width: 80%;
  margin-bottom: 20px;
}
.el-input {
  width: 80%;
  margin-bottom: 20px;
}
.button {
  margin-bottom: 20px;
}

</style>
