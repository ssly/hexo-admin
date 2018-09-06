import Vue from 'vue'

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
  Icon,
  Loading,
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Icon)

Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
