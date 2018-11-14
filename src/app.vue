<template>
  <div id="app">
    <el-container>
      <el-header>
        <strong>Hexo在线管理系统</strong>
        <div>
          <el-button
            icon="el-icon-tickets"
            @click="toPageByPath('/')"
          ></el-button>
          <el-button
            icon="el-icon-plus"
            @click="toPageByPath('/article')"
          ></el-button>
          <div class="config-container">
            <config></config>
          </div>
        </div>
      </el-header>
      <el-alert
        v-if="pageSuccess && !hexoObject.source"
        title="请先点击右上角设置，配置hexo路径，否则将影响功能"
        type="warning"
        show-icon
        :closable="false"
      ></el-alert>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Config from '@/components/config/index'

export default {
  name: 'App',

  components: {
    Config,
  },

  data () {
    return {
      pageSuccess: false, // 页面加载完成
    }
  },

  computed: {
    ...mapGetters('config', [
      'hexoObject',
    ]),
  },

  methods: {
    ...mapActions('config', [
      'getConfig',
    ]),

    toPageByName (name) {
      this.$router.push({ name })
    },

    toPageByPath (path) {
      this.$router.push({ path })
    },
  },

  created () {
    this.getConfig().then(isSuccess => {
      this.pageSuccess = true
    })
  },
}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.config-container {
  display: inline-block;
  margin-left: 10px;
}
</style>
