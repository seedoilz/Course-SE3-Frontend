<template>
  <div>
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
          <el-select class="text-item" v-model="select" placeholder="请选择检测版本">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
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

export default {
  name: 'MainView',
  data () {
    return {
      text_score: '',
      file_score: '',
      text: '',
      file: '',
      select: 'trinary',
      keyword: '',
      options: [{
        value: 'trinary'
      }, {
        value: 'binary'
      }, {
        value: 'scale'
      }],
      action: 'http://124.70.198.102:3456',
      mode: {}
    }
  },
  mounted () {
    this.setCorpus()
  },
  methods: {
    getTextScore () {
      console.log(this.text, this.keyword, this.select)
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
      let options = ['scale', 'a']
      axios.post('http://124.70.198.102:3456/text/corpus?' + options.map(s => {
        return 'options=' + s
      }).join('&')).then(res => {
        console.log(res)
      })
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
bg-purple-dark {
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
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  height: 80%;
  padding: 15px 50px;
  width: 50%;
}
.text-item {
  width: 100%;
  margin-bottom: 10px;
}
.file-upload {
  text-align: center;
}
</style>
