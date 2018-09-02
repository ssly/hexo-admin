// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Form,
  FormItem,
  Button,
  Input,
  Select,
  Option,
  Message,
  MessageBox,
  Notification,
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
