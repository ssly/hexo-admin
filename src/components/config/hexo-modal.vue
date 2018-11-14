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
    >
      <el-alert
        class="tips-item"
        :title="tips"
        type="warning"
        show-icon
        :closable="false"
      ></el-alert>
      <el-form-item label="hexo 目录：" prop="source">
        <el-input v-model="hexoItem.source"></el-input>
      </el-form-item>
      <el-form-item label="文档分类：" prop="categories">
        <el-input placeholder="多个以 , 分割" v-model="hexoItem.categories"></el-input>
      </el-form-item>
      <el-form-item label="文档标签：" prop="tags">
        <el-input placeholder="多个以 , 分割" v-model="hexoItem.tags"></el-input>
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
      tips: '请正确配置您的 hexo 根目录，否则功能将无法使用，改变 hexo 路径需要等待服务器重启',
      isVisible: false, // 弹窗是否显示
      hexoItem: { // hexo 对象数据
        source: '',
        categories: '',
        tags: '',
      },
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
        const { source, categories, tags } = this.hexoObject
        this.hexoItem.source = source
        this.hexoItem.categories = categories
        this.hexoItem.tags = tags
      })
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
        }).catch(() => {})
      })
    },

    // 弹窗关闭之后的回调
    hasModalClosed () {
      this.$refs.hexoForm.resetFields()
    },
  },
}
</script>

<style scoped>
.tips-item {
  margin-bottom: 30px;
}
</style>
