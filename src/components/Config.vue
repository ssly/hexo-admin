<template>
<div>
  <h2>配置界面</h2>
  <el-button @click="toPage('Main')">返回首页</el-button>
  <center>【可以动态配置如下内容，功能敬请期待……】</center>
  <center>1. hexo目录路径</center>
  <center>1. 分类列表</center>
  <center>1. 标签列表</center>
</div>
</template>

<script>
export default {
  name: 'Config',
  data () {
    return {
    }
  },

  methods: {
    toPage (name) {
      this.$router.push({ name })
    }
  }
}
</script>
