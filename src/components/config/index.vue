<template>
<div class="config-index-page">
  <el-dropdown @command="handleCommand">
    <el-button icon="el-icon-more-outline"></el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="hexoConfig">hexo 配置</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>

  <hexo-modal ref="hexoModal"></hexo-modal>
</div>
</template>

<script>
/**
 * 配置相关的操作组件
 */

import HexoModal from './hexo-modal'

export default {
  components: {
    HexoModal,
  },

  data () {
    return {

    }
  },

  methods: {
    // 设置下拉菜单点击触发
    handleCommand (command) {
      switch (command) {
        case 'hexoConfig':
          console.log('commadn hexoConfig')
          this.$refs.hexoModal.openModal()
          break
      }
    },
  },
}
</script>

<style scope lang="less">
.config-index-page {
  display: inline-block;
}
</style>
