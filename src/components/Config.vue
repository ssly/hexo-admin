<template>
<div>
  <h2>配置界面</h2>
  <el-button @click="toPageByName('Main')">返回首页</el-button>
  <div class="container">
    hexo目录(同服务器的hexo根目录)：
    <el-input v-model="source"></el-input>
    分类：
    <el-input v-model="categories"></el-input>
    标签：
    <el-input v-model="tags"></el-input>
  </div>

  <center>
    <el-button @click="save">保存</el-button>
  </center>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Config',
  data () {
    return {
      source: '',
      categories: '',
      tags: '',
    }
  },

  computed: {
    ...mapGetters([
      'hexoSource',
      'categoriesOption',
      'tagsOption'
    ]),
  },

  methods: {
    ...mapActions([
      'getConfig',
      'saveConifg',
    ]),

    toPageByName (name) {
      this.$router.push({ name })
    },

    save () {
      if (
        this.source === '' ||
        this.categories === '' ||
        this.tags === ''
      ) {
        this.$message.error('信息有误，请重新提交')
        return
      }

      const data = {
        source: this.source,
        categories: this.categories,
        tags: this.tags,
      }
      this.saveConifg(data).then(() => {
        this.$message({
          message: '提交成功',
          type: 'success',
        })
      })
    }
  },

  created () {
    this.getConfig().then(() => {
      this.source = this.hexoSource
      this.categories = this.categoriesOption.join(',')
      this.tags = this.tagsOption.join(',')
    })
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 500px;
}
</style>
