<template>
  <el-menu
    :default-active="getActivePath"
    style="position: fixed;"
    mode="vertical"
    class="nav"
    @select="handleSelect"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapsed"
    router
  >
    <el-menu-item @click="isCollapsed=!isCollapsed" id="close">
      <i class="el-icon-arrow-right"></i>
    </el-menu-item>
    <el-menu-item
      :index=PATH.MAIN_VIEW.path>
      <i class="el-icon-s-home"></i>
      <template #title>情绪分析</template>
    </el-menu-item>
    <el-menu-item
      :index=PATH.MANAGEMENT_VIEW.path
    >
      <i class="el-icon-s-tools"></i>
      <template #title>数据管理</template>
    </el-menu-item>
    <el-menu-item
      :index=PATH.CHART_VIEW.path
    >
      <i class="el-icon-s-grid"></i>
      <template #title>统计分析</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {PATH} from '@/commons/const'

export default {
  name: 'NavMenu',
  props: {
    activePath: String
  },
  data () {
    return {
      PATH: PATH,
      isCollapsed: true
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    getActivePath () {
      console.log(this.activePath)
      if (this.activePath == null) {
        return this.$route.path
      } else {
        return this.activePath
      }
    }
  }
}
</script>

<style scoped>
.nav{
  z-index: 100;
  /*right: 0;*/
  left: 0;
  top:15%;
  /*border-radius: 10px;*/
}
.nav .el-menu-item{
  /*border-radius: 10px;*/
}

.nav:not(.el-menu--collapse){
  top:15%;
  width: 150px;
  border: 0;
}

.nav.el-menu--collapse{
  top:15%;
  border: 0;
}
.nav:not(.el-menu--collapse) .el-menu-item .el-icon-arrow-right{
  transform: none;
  transition: 0.2s;
}

.nav:not(.el-menu--collapse) .el-menu-item:hover .el-icon-arrow-right{
  transform: rotate(180deg);
  transition: 0.2s;
}

.nav.el-menu--collapse .el-icon-arrow-right{
  transform: rotate(180deg);
  transition: 0.2s;
}

.nav.el-menu--collapse .el-menu-item:hover .el-icon-arrow-right{
  transform: none;
  transition: 0.2s;
}
</style>
