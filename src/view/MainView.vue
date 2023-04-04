<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          请输入文本
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-input id="text-input" placeholder="请输入待检测文本" v-model="text"></el-input>
          <el-input id="keyword-input" placeholder="请输入关键词" v-model="keyword"></el-input>
          <el-select v-model="select" placeholder="请选择检测版本">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button @click="getTextScore">开始检测</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          {{data_text}}
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          请上传文件
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-success="getFileScore"
            multiple
            :limit="1"
            :file="file">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传txt文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          {{data_file}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {analyzeText, analyzeFile} from '@/network/main'

export default {
  name: 'MainView',
  data () {
    return {
      data_text: '',
      data_file: '',
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
      }]
    }
  },
  mounted () {
  },
  methods: {
    getTextScore () {
      console.log(this.text, this.keyword, this.select)
      analyzeText(this.text).then(res => {
        if (res.code === 200) {
          this.data_text = res.data
        } else {
          console.log(res.message)
        }
      })
    },
    getFileScore (file) {
      console.log(file)
      console.log('file', this.file)
      analyzeFile(this.file).then(res => {
        if (res.code === 200) {
          this.data_file = res.data
        } else {
          console.log(res.message)
        }
      })
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>
el-row {
  height: 500px;
  width: 100%;
}
el-col {
  border-radius: 4px;
  height: 500px;
  align-content: center;
  padding-bottom: 15px;
  padding-top: 15px;
  width: 70%;
}
el-upload {
  width: 80px;
  height: 80px;
  align-content: center;
}
.el-icon-upload{
  width: 80px;
  height: auto;
  align-content: center;
}
.el-upload__text {
  width: 80%;
  height: 80%;
  align-content: center;
}
.el-upload__tip {
  width: 80%;
  height: 80%;
  align-content: center;
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
  align-content: center;
  text-align: center;
  height: auto;
  margin-bottom: 15px;
  margin-top: 15px;
  padding: 15px 50px;
  width: 50%;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
