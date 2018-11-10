<template>
  <el-dialog
    title="hexo 配置"
    :visible.sync="isVisible"
    @closed="hasModalClosed"
  >
    <el-form
      label-width="160px"
      ref="hexoForm"
      :model="hexoItem"
      :rules="rules"
    >
      <el-form-item label="hexo 目录：" prop="source">
        <el-input v-model="hexoItem.source"></el-input>
      </el-form-item>
      <el-form-item label="文档分类：" prop="categories">
        <el-input v-model="hexoItem.categories"></el-input>
      </el-form-item>
      <el-form-item label="文档标签：" prop="tags">
        <el-input v-model="hexoItem.tags"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="openModal(false)">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
 * hexo 相关配置页面
 */
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isVisible: false, // 弹窗是否显示
      hexoItem: { // hexo 对象数据
        source: '',
        categories: '',
        tags: '',
      },
      rules: { // 校验规则对象
        source: [{ required: true, message: 'hexo 路径不能为空', trigger: 'change' }],
      }
    }
  },

  computed: {
    ...mapGetters('config', [
      'hexoObject',
    ])
  },

  methods: {
    ...mapActions('config', [
      'getConfig',
      'saveConfig',
    ]),

    // 初始化操作
    initModal () {
      // 弹窗打开的时候初始化
      this.getConfig().then(isSuccess => {
        console.log('isSuccess', isSuccess, this.hexoObject)
        const { source, categories, tags } = this.hexoObject
        this.hexoItem.source = source
        this.hexoItem.categories = categories
        this.hexoItem.tags = tags
      })
      // getConfig().then(data => {
      //   console.log('弹窗初始化', data)
      //   console.log(this.hexoItem)
      // })
    },

    // 打开或关闭弹窗
    openModal (isShow = true) {
      if (isShow) {
        // 打开弹窗时候，初始化参数
        this.initModal()
      }
      this.isVisible = isShow
    },

    // 保存数据
    save () {
      this.$refs.hexoForm.validate(valid => {
        if (!valid) {
          return
        }
        const { source, categories, tags } = this.hexoItem
        const data = { source, categories, tags }
        this.saveConfig(data).then(() => {
          this.openModal(false)
        })
      })
    },

    // 弹窗关闭之后的回调
    hasModalClosed () {
      this.$refs.hexoForm.resetFields()
    },
  },
}
</script>
