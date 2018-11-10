<template>
  <div id="app">
    <el-container>
      <el-header>
        <strong>Hexo在线管理系统</strong>
        <el-button @click="toPageByName('Main')">内容编辑</el-button>
        <el-button @click="toPageByName('Edit')">管理页面</el-button>
        <config></config>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Config from '@/components/config/index'

export default {
  name: 'App',

  components: {
    Config,
  },

  methods: {
    toPageByName (name) {
      this.$router.push({ name })
    },
  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>
