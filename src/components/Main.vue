<template>
<div>
  <div class="top-bar">
    <div>
      <el-button @click="toPageByName('Config')">配置页面</el-button>
      <el-button @click="handleSubmit">提交</el-button>
    </div>
    <el-input class="new-input" placeholder="标题" v-model="title"></el-input>
    <el-select v-model="categories" placeholder="分类">
      <el-option
        v-for="item in categoriesOption"
        :key="item"
        :value="item"
      >
        {{item}}
      </el-option>
    </el-select>
    <el-select multiple v-model="tags" placeholder="标签">
      <el-option
        v-for="item in tagsOption"
        :key="item"
        :value="item"
      >
        {{item}}
      </el-option>
    </el-select>
  </div>
  <el-input
    type="textarea"
    :rows="20"
    placeholder="请输入 markdown 正文"
    v-model="content">
  </el-input>
</div>
</template>

<script>
import { submit } from '../assets/ajax'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      title: '',
      content: '',
      categories: '',
      tags: [],
    }
  },

  computed: {
    ...mapGetters([
      'categoriesOption',
      'tagsOption'
    ])
  },

  methods: {
    ...mapActions([
      'getConfig',
    ]),

    handleSubmit () {
      this.$confirm('确定要提交吗?', '提示', {
        type: 'warning'
      }).then(() => {
        // 对文本进行校验
        if (
          this.title === '' ||
          this.content === '' ||
          this.categories === '' ||
          this.tags === ''
        ) {
          this.$message.error('信息有误，请重新提交')
          return
        }
        const options = {
          title: this.title,
          content: this.content,
          categories: this.categories,
          tags: this.tags,
        }

        console.log('提交前需要校验', options)
        submit(options).then(() => {
          this.title = ''
          this.content = ''
          this.categories = ''
          this.tags = ''

          this.$message({
            message: '提交成功',
            type: 'success',
          })
        })
      })
    },

    toPageByName (name) {
      this.$router.push({ name })
    }

  },

  created () {
    this.getConfig()
  }
}
</script>

<style scoped>
.new-input {
  width: 300px;
}
</style>
