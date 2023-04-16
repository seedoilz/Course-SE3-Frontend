<template>
  <div>
    <el-checkbox-group
      v-model="optionsList"
      :min="0"
      :max="200">
      <el-checkbox-button class="checkboxParam" v-for="param in params" :label="param" :key="param">{{param}}</el-checkbox-button>
    </el-checkbox-group>
    <el-input class="inputParam" v-model="wordsBeforeKeywords" placeholder="wordsBeforeKeywords"></el-input>
    <el-input class="inputParam" v-model="wordsAfterKeywords" placeholder="wordsAfterKeywords"></el-input>
    <el-input class="inputParam" v-model="negativeMultiplier" placeholder="negativeMultiplier"></el-input>
    <el-input class="inputParam" v-model="minPunctuationWithExclamation" placeholder="minPunctuationWithExclamation"></el-input>
    <el-input class="inputParam" v-model="mood" placeholder="mood"></el-input>
    <el-input class="inputParam" v-model="illegalDoubleLettersInWordMiddle" placeholder="illegalDoubleLettersInWordMiddle"></el-input>
    <el-input class="inputParam" v-model="illegalDoubleLettersAtWordEnd" placeholder="illegalDoubleLettersAtWordEnd"></el-input>
    <el-input class="inputParam" v-model="negatedWordStrengthMultiplier" placeholder="negatedWordStrengthMultiplier"></el-input>
    <el-input class="inputParam" v-model="maxWordsBeforeSentimentToNegate" placeholder="maxWordsBeforeSentimentToNegate"></el-input>
    <el-input class="inputParam" v-model="maxWordsAfterSentimentToNegate" placeholder="maxWordsAfterSentimentToNegate"></el-input>
    <el-input class="inputParam" v-model="MinSentencePosForQuotesIrony" placeholder="MinSentencePosForQuotesIrony"></el-input>
    <el-input class="inputParam" v-model="MinSentencePosForPunctuationIrony" placeholder="MinSentencePosForPunctuationIrony"></el-input>
    <el-input class="inputParam" v-model="MinSentencePosForTermsIrony" placeholder="MinSentencePosForTermsIrony"></el-input>
    <el-input class="inputParam" v-model="MinSentencePosForAllIrony" placeholder="MinSentencePosForAllIrony"></el-input>

    <el-select class="inputParam" v-model="select" placeholder="请选择检测版本">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.value"
        :value="item.value">
      </el-option>
    </el-select>
    <br>
    <el-radio v-model="param1" label="sentiment">sentiment</el-radio>
    <el-radio v-model="param1" label="stress">stress</el-radio>
    <br>
    <el-radio v-model="param2" label="sentenceCombineAv">sentenceCombineAv</el-radio>
    <el-radio v-model="param2" label="sentenceCombineTot">sentenceCombineTot</el-radio>
    <br>
    <el-radio v-model="param3" label="paragraphCombineAv">paragraphCombineAv</el-radio>
    <el-radio v-model="param3" label="paragraphCombineTot">paragraphCombineTot</el-radio>
    <br>

    <el-button @click="setCorpus" type="primary" plain style="margin-bottom: 10px; margin-top: 10px">创建语料库</el-button>
    <el-row class="el-row">
      <el-col :span="8" class="el-col">
        <div class="grid-content bg-purple">
          请输入文本
        </div>
      </el-col>
      <el-col :span="8" class="el-col">
        <div class="grid-content bg-purple-light">
          <el-input class="text-item" placeholder="请输入待检测文本" v-model="text"></el-input>
          <el-input class="text-item" placeholder="请输入关键词" v-model="keyword"></el-input>
          <br>
          <el-button @click="getTextScore" type="primary" plain>开始检测</el-button>
        </div>
      </el-col>
      <el-col :span="8" class="el-col">
        <div class="grid-content bg-purple">
          {{ text_score }}
        </div>
      </el-col>
    </el-row>

    <el-row class="el-row">
      <el-col :span="8" class="el-col">
        <div class="grid-content bg-purple">
          请上传文件
        </div>
      </el-col>
      <el-col :span="8" class="el-col">
        <div class="grid-content bg-purple-light">
          <el-upload
            class="file-upload"
            action="action"
            :on-preview="handlePreview"
            :http-request="fileUpload"
            :on-success="getFileScore"
            multiple
            :limit="1"
            :file="file">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传txt文件，且不超过500kb</div>
          </el-upload>
          <el-button @click="getFileScore" type="primary" plain>开始检测</el-button>
        </div>
      </el-col>
      <el-col :span="8" class="el-col">
        <div class="grid-content bg-purple">
          {{ file_score }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {analyzeText} from '@/network/main'
import axios from 'axios'
const optionsParam = ['noBoosters', 'noNegatingPositiveFlipsEmotion', 'noNegatingNegativeNeutralisesEmotion', 'noNegators', 'noIdioms',
  'questionsReduceNeg', 'noEmoticons', 'exclamations2', 'noMultiplePosWords', 'noMultipleNegWords', 'noIgnoreBoosterWordsAfterNegatives',
  'noDictionary', 'noDeleteExtraDuplicateLetters', 'noMultipleLetters', 'negatingWordsDontOccurBeforeSentiment', 'negatingWordsOccurAfterSentiment',
  'alwaysSplitWordsAtApostrophes', 'capitalsBoostTermSentiment', 'explain', 'echo', 'UTF8']

export default {
  name: 'MainView',
  data () {
    return {
      text_score: '',
      file_score: '',
      text: '',
      file: '',
      select: 'scale',
      keyword: '',
      options: [{
        value: 'trinary'
      }, {
        value: 'binary'
      }, {
        value: 'scale'
      }],
      action: 'http://124.70.198.102:3456',
      mode: {},
      params: optionsParam,
      optionsList: [],
      wordsBeforeKeywords: '',
      wordsAfterKeywords: '',
      negativeMultiplier: '',
      minPunctuationWithExclamation: '',
      mood: '',
      illegalDoubleLettersInWordMiddle: '',
      illegalDoubleLettersAtWordEnd: '',
      negatedWordStrengthMultiplier: '',
      maxWordsBeforeSentimentToNegate: '',
      maxWordsAfterSentimentToNegate: '',
      MinSentencePosForQuotesIrony: '',
      MinSentencePosForPunctuationIrony: '',
      MinSentencePosForTermsIrony: '',
      MinSentencePosForAllIrony: '',
      param1: '',
      param2: '',
      param3: ''
    }
  },
  mounted () {
  },
  methods: {
    getTextScore () {
      // console.log(this.text, this.keyword, this.select)
      this.setCorpus()
      analyzeText(this.text).then(res => {
        if (res.code === 200) {
          this.text_score = res.data
        } else {
          console.log(res.message)
        }
      })
    },
    getFileScore () {
      this.setCorpus()
      console.log('this.file', this.file)
      let fd = new FormData()
      fd.append('file', this.file)
      console.log('fd', fd)
      axios.post('http://124.70.198.102:3456/text/file', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (response.status === 200) {
          console.log('res', response)
          this.file_score = 'success'
          // 创建一个Blob对象
          const blob = new Blob([response.data], {type: response.headers['content-type']})
          // 创建一个URL对象
          const url = window.URL.createObjectURL(blob)
          // 创建一个a标签
          const link = document.createElement('a')
          link.href = url
          link.download = 'result.txt'
          // 模拟点击a标签
          link.click()
        } else {
          console.log('fail')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    fileUpload (item) {
      this.file = item.file
      this.mode = item.file
      // console.log('this.file', this.file)
      // console.log('item.file', item.file)
    },
    handlePreview (file) {
    },
    setCorpus () {
      let options = []
      options = this.getOptions(options)
      options.push(this.select, this.param1, this.param2, this.param3)
      console.log(options)
      axios.post('http://124.70.198.102:3456/text/corpus?' + options.map(s => {
        return 'options=' + s
      }).join('&')).then(res => {
        console.log(res)
      })
    },
    getOptions (options) {
      options = options.concat(this.optionsList)

      if (this.wordsBeforeKeywords !== '') {
        options.push('wordsBeforeKeywords', this.wordsBeforeKeywords)
      }
      if (this.wordsAfterKeywords !== '') {
        options.push('wordsAfterKeywords', this.wordsAfterKeywords)
      }
      if (this.negativeMultiplier !== '') {
        options.push('negativeMultiplier', this.negativeMultiplier)
      }
      if (this.minPunctuationWithExclamation !== '') {
        options.push('minPunctuationWithExclamation', this.minPunctuationWithExclamation)
      }
      if (this.mood !== '') {
        options.push('mood', this.mood)
      }
      if (this.illegalDoubleLettersInWordMiddle !== '') {
        options.push('illegalDoubleLettersInWordMiddle', this.illegalDoubleLettersInWordMiddle)
      }
      if (this.illegalDoubleLettersAtWordEnd !== '') {
        options.push('illegalDoubleLettersAtWordEnd', this.illegalDoubleLettersAtWordEnd)
      }
      if (this.negatedWordStrengthMultiplier !== '') {
        options.push('negatedWordStrengthMultiplier', this.negatedWordStrengthMultiplier)
      }
      if (this.maxWordsBeforeSentimentToNegate !== '') {
        options.push('maxWordsBeforeSentimentToNegate', this.maxWordsBeforeSentimentToNegate)
      }
      if (this.maxWordsAfterSentimentToNegate !== '') {
        options.push('maxWordsAfterSentimentToNegate', this.maxWordsAfterSentimentToNegate)
      }
      if (this.MinSentencePosForQuotesIrony !== '') {
        options.push('MinSentencePosForQuotesIrony', this.MinSentencePosForQuotesIrony)
      }
      if (this.MinSentencePosForPunctuationIrony !== '') {
        options.push('MinSentencePosForPunctuationIrony', this.MinSentencePosForPunctuationIrony)
      }
      if (this.MinSentencePosForTermsIrony !== '') {
        options.push('MinSentencePosForTermsIrony', this.MinSentencePosForTermsIrony)
      }
      if (this.MinSentencePosForAllIrony !== '') {
        options.push('MinSentencePosForAllIrony', this.MinSentencePosForAllIrony)
      }

      return options
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 400px;
  width: 100%;
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
  height: 60%;
  align-content: center;
  display: table;
}
el-upload {
  width: 80px;
  height: 80px;
  align-content: center;
}
.el-upload__tip {
  width: 80%;
  height: 80%;
  align-content: center;
  text-align: center;
  margin-left: 10%;
  margin-bottom: 10px;
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
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  height: 80%;
  padding: 15px 50px;
  width: 50%;
}
.text-item {
  width: 50%;
  margin-bottom: 10px;
}
.file-upload {
  text-align: center;
}
.inputParam {
  margin-bottom: 10px;
  width: 50%;
  /*border: solid 1px  cornflowerblue;*/
  border-radius: 10px;
}
.checkboxParam {
  margin-bottom: 10px;
}
</style>
