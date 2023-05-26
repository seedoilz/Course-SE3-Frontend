<template>
<div>
<el-container>
  <el-header>
    Header
    <div>
      PLACEHOLDER
    </div>
  </el-header>
  <el-container style="height: 100vh;">
    <el-aside>
      Aside
      <div>
        PLACEHOLDER
      </div>
    </el-aside>
    <el-main>
      Main
      <div>
        PLACEHOLDER
      </div>
      <div class="top">
        <div style="margin: 20px; text-align: right;">
          <el-input
            v-model="search"
            size="mini"
            style="width: 50%"
            placeholder="search"/>
        </div>
      </div>
      <div style="text-align: center;">
        <el-table
        :data="dataList.filter(data => !search || data.labels.includes(search) || data.content.includes(search))"
        style="width: 100%;"
        max-height="800"
        :header-cell-style="{'text-align': 'center'}"
        :cell-style="{'text-align': 'center'}">
        <el-table-column
          prop="issueNumber"
          label="issue no"
          width="100">
        </el-table-column>
        <el-table-column
          prop="internalIssueNumber"
          label="internal no"
          width="100">
        </el-table-column>
        <el-table-column
          prop="username"
          label="username"
          width="100">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="project"
          width="100">
        </el-table-column>
        <el-table-column
          prop="versionNumber"
          label="version"
          width="80">
        </el-table-column>
        <el-table-column
          type="expand"
          label="details"
          width="100">
          <template #default="props">
            <div>content: {{props.row.content}}</div>
            <div>labels: {{props.row.labels}}</div>
            <div>isPullRequest: {{props.row.isPullRequest}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="created time"
          width="150">
        </el-table-column>
        <el-table-column
          prop="endedAt"
          label="ended time"
          width="150">
        </el-table-column>
        <el-table-column
          prop="positiveScore"
          label="p_score"
          width="100">
        </el-table-column>
        <el-table-column
          prop="negativeScore"
          label="n_score"
          width="100">
        </el-table-column>
      </el-table>
      </div>
    </el-main>
  </el-container>

</el-container>
</div>
</template>

<script>
import {listAllData} from '@/network/management'

export default {
  name: 'ManagementView',
  mounted () {
    listAllData({
      params: {

      }
    }).then(res => {
      if (res.code === 200) {
        this.dataList = res.data.list
      } else {
        this.$message({
          message: res.data.list
        })
      }
    })
  },
  data () {
    return {
      dataList: [],
      search: '',
      classificationList: []

    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
