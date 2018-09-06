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
  <div class="main-container">
    <div class="left-container">
      <textarea
        class="textarea"
        v-model="content"
        placeholder="请输入 markdown 正文"
      />
    </div>
    <div class="right-container">
      <vue-markdown class="markdown-body" :source="content"></vue-markdown>
    </div>
  </div>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapGetters, mapActions } from 'vuex'
import { submit } from '../assets/ajax'

export default {
  name: 'HelloWorld',

  components: {
    VueMarkdown
  },

  data () {
    return {
      title: '',
      content: '',
      categories: '',
      tags: [],
      mainWidth: 600,
      isMoving: false,
      currentX: 0,
    }
  },

  computed: {
    ...mapGetters([
      'categoriesOption',
      'tagsOption'
    ]),
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
          this.tags.length === 0
        ) {
          this.$message.error('信息有误，请重新提交')
          return
        }
        const options = {
          title: this.title,
          content: this.content,
          categories: this.categories,
          tags: this.tags.join(','),
        }

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
      }).catch(err => err)
    },

    toPageByName (name) {
      this.$router.push({ name })
    },
  },

  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="less">
.new-input {
  width: 300px;
}
.main-container {
  width: 100%;
  height: 700px;
}
.left-container,
.right-container {
  float: left;
  width: 50%;
  height: 100%;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}

.textarea {
  width: 100%;
  height: 100%;
  display: block;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  font-size: inherit;
  border: none;
  outline: none;
  resize: none;
}

.cross-line {
  width: 4px;
  height: 100%;

  &:hover {
    background: red;
    cursor: col-resize;
  }
}

.markdown-body {
  padding: 20px;
  height: 100%;
}
</style>
