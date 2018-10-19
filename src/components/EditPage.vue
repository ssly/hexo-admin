<template>
<div>
  <h2>详情界面</h2>
  <el-button @click="toPageByName('Main')">返回首页</el-button>
  <div class="container">
    博文详情目录：
    <ul>
        <li v-for="item in  blogLists" :key="item.name">
            <span>{{item.name}}</span>
            <span class="edit-icon">
              <i class="el-icon-edit" @click="editPage(item.name)"></i>
              <i class="el-icon-delete" @click="deletePage(item.name)"></i>
            </span>
        </li>
    </ul>
  </div>

</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { deleteByName } from '../assets/ajax'
export default {
  data () {
    return {

    }
  },

  computed: {
    ...mapState(['blogLists'])
  },

  methods: {
    ...mapActions(['getBlogList']),
    toPageByName (name) {
      this.$router.push({ name })
    },
    deletePage (name) {
      this.$confirm('确定要删除该条吗?', '提示', {
        type: 'warning'
      }).then(() => {
        deleteByName({name}).then(res => {
          if (res.code === 0) {
            this.getBlogList()
          }
        })
      }).catch(err => err)
    },
    editPage (name) {
      this.$router.push({path: `/${name}`})
    }
  },
  created () {
    this.getBlogList()
  }
}
</script>

<style scoped lang="less">
.container {
  margin: 0 auto;
  width: 800px;
  ul {
    list-style: none;
    li {
        border: 1px solid #dcdfe6;
        height: 50px;
        line-height: 50px;
        margin-top: 10px;
        border-radius: 4px;
        padding: 0 15px;
        &:hover {
            box-shadow: 5px 5px 20px #dcdfe6;
        }
        .edit-icon {
          float: right;
          i {
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: #3598db;
            }
          }
        }
    }
  }
}
</style>
